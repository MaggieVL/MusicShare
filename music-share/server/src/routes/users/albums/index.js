const express = require('express');
const indicative = require('indicative');
//const validationRules = require('./validation-rules');
const sendErrorResponse = require('../../utils').sendErrorResponse;
const replaceId = require('../../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const album = require('./album-middleware');
const songRoutes = require('./songs');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const user = res.locals.user;

    try {
        const albums = await req.app.locals.db.collection('albums').find({ userId: new ObjectID(user.id) }).toArray();
        res.json(albums.map(album => replaceId(album)));
    } catch (errors) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async (req, res, next) => {
    const user = res.locals.user;
    const album = req.body;

    try {
        //await indicative.validator.validate(data, validationRules);

        try {
            album.userId = new ObjectID(user.id);
            const r = await req.app.locals.db.collection('albums').insertOne(album);
            if (r.result.ok && r.insertedCount === 1) {
                delete album._id;
                album.id = r.insertedId;
                res.status(201).location(`api/users/${user.id}/albums/${album.id}`).json(album);
            } else {
                sendErrorResponse(req, res, 500, `Unable to create album: ${album.title}`);
            }
        } catch (err) {
            console.log(`Unable to create album: ${album.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create album: ${album.title}`, err);
        }
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid album data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.get('/:albumId', async (req, res, next) => {
    const user = res.locals.user;
    const params = req.params;

    try {
        await indicative.validator.validate(params, { albumId: 'required|regex:^[0-9a-f]{24}$' });
        const album = await req.app.locals.db.collection('albums').findOne({
            _id: new ObjectID(params.albumId),
            userId: new ObjectID(user.id)
        });
        if (!album) {
            sendErrorResponse(req, res, 404, `Album with ID=${params.albumId} does not exist for user with ID=${user.id}`);
            return;
        }
        res.json(album);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid album data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:albumId', async (req, res, next) => {
    const user = res.locals.user;
    const albumId = req.params.albumId;

    try {
        await indicative.validator.validate({ albumId }, { albumId: 'required|regex:^[0-9a-f]{24}$' });

        const old = await req.app.locals.db.collection('albums').findOne({
            _id: new ObjectID(albumId),
            userId: new ObjectID(user.id)
        });
        if (!old) {
            sendErrorResponse(req, res, 404, `Album with ID=${albumId} does not exist for user with ID=${user.id}`);
            return;
        }
        const album = req.body;
        if (old._id.toString() !== album.id) {
            sendErrorResponse(req, res, 400, `Album ID=${album.id} does not match URL ID=${albumId}`);
            return;
        }

        // await indicative.validator.validate(album, validationRules);

        try {
            r = await req.app.locals.db.collection('albums').updateOne({ _id: new ObjectID(albumId) }, { $set: album });
            if (r.result.ok) {
                delete album._id;
                console.log(`Updated album: ${JSON.stringify(album)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new albums are the same.`);
                }
                res.json(album);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update album with ID=${album.id}: ${album.title}`);
            }
        } catch (err) {
            console.log(`Unable to update album with ID=${album.id}: ${album.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to update album with ID=${album.id}: ${album.title}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid album data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:albumId', async (req, res, next) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { albumId: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('albums').findOne({ _id: new ObjectID(params.albumId) });
        if (!old) {
            sendErrorResponse(req, res, 404, `Album with ID=${params.albumId} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('albums').deleteOne({ _id: new ObjectID(params.albumId) });
        if (r.result.ok && r.deletedCount === 1) {
            res.json(old);
        } else {
            console.log(`Unable to delete album with ID=${old.id}: ${old.title}`);
            sendErrorResponse(req, res, 500, `Unable to delete album with ID=${old.id}: ${old.title}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid album data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.use('/:albumId/songs', album, songRoutes);

module.exports = router;
