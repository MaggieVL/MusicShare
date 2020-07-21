const express = require('express');
const loginRoutes = require('./login');
const indicative = require('indicative');
const validationRules = require('./validation-rules');
const sendErrorResponse = require('../utils').sendErrorResponse;
const replaceId = require('../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const user = require('./user-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await req.app.locals.db.collection('users').find().toArray();
        res.json(users.map(user => replaceId(user)));
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async (req, res, next) => {
    const user = req.body;

    try {
        await indicative.validator.validate(user, validationRules);

        try {
            const r = await req.app.locals.db.collection('users').insertOne(user);
            if (r.result.ok && r.insertedCount === 1) {
                delete user._id;
                user.id = r.insertedId;
                res.status(201).location(`api/users/${user.id}`).json(user);
            } else {
                sendErrorResponse(req, res, 500, `Unable to create user: ${user.name}, ${user.username}`);
            }
        } catch (err) {
            console.log(`Unable to create user: ${user.name}, ${user.username}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create user: ${user.name}, ${user.username}`, err);
        }
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.get('/:userId', async (req, res, next) => {
    const params = req.params;

    try {
        await indicative.validator.validate(params, { userId: 'required|regex:^[0-9a-f]{24}$' });
        const user = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(params.userId) });
        if (!user) {
            sendErrorResponse(req, res, 404, `User with ID=${params.userId} does not exist`);
            return;
        }
        res.json(user);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(userId) });
    if (!old) {
        sendErrorResponse(req, res, 404, `User with ID=${userId} does not exist`);
        return;
    }
    const user = req.body;
    if (old._id.toString() !== user.id) {
        sendErrorResponse(req, res, 400, `User ID=${user.id} does not match URL ID=${userId}`);
        return;
    }
    try {
        await indicative.validator.validate(user, validationRules);
        try {
            r = await req.app.locals.db.collection('users').updateOne({ _id: new ObjectID(userId) }, { $set: user });
            if (r.result.ok) {
                delete user._id;
                console.log(`Updated user: ${JSON.stringify(user)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new users are the same.`);
                }
                res.json(user);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update user: ${user.id}: ${user.name}, ${user.username}`);
            }
        } catch (err) {
            console.log(`Unable to update user: ${user.id}: ${user.name}, ${user.username}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to update user: ${user.id}: ${user.name}, ${user.username}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:userId', async (req, res, next) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { userId: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(params.userId) });
        if (!old) {
            sendErrorResponse(req, res, 404, `User with ID=${params.userId} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('users').deleteOne({ _id: new ObjectID(params.userId) });
        if (r.result.ok && r.deletedCount === 1) {
            res.json(old);
        } else {
            console.log(`Unable to delete user: ${old.id}: ${old.name} ${old.username}`);
            sendErrorResponse(req, res, 500, `Unable to delete user: ${old.id}: ${old.name} ${old.username}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.use('/login', user, loginRoutes);

module.exports = router;
