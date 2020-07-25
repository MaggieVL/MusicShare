const express = require('express');
const indicative = require('indicative');
//const validationRules = require('./validation-rules');
const sendErrorResponse = require('../../utils').sendErrorResponse;
const replaceId = require('../../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const { uuid } = require('uuidv4');
var multer  = require('multer');

const SONG_IDEAS_PATH = './static/song-ideas';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, SONG_IDEAS_PATH);
  },
  filename(req, file, cb) {
    const splitFileName = file.originalname.split('.');
    const extension = splitFileName[splitFileName.length - 1];
    cb(null, `${uuid()}.${extension}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', async (req, res, next) => {
    const user = res.locals.user;

    try {
        const songIdeas = await req.app.locals.db.collection('songIdeas').find({ userId: new ObjectID(user.id) }).toArray();
        res.json(songIdeas.map(songIdea => replaceId(songIdea)));
    } catch (errors) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', upload.single('audiofile'), async (req, res, next) => {
    const user = res.locals.user;
    console.log(`res.locals.user: ${user}`);
    const audiofileName = req.file ? req.file.filename : undefined;
    console.log("audiofileName: " + audiofileName)
    console.log("req.body.data: " + req.body.data);
    const data = JSON.parse(req.body.data);
    const songIdea = {...data, audiofileName};
    console.log("songIdea: " + songIdea);

    try {
        //await indicative.validator.validate(data, validationRules);

        try {
            songIdea.userId = new ObjectID(user.id);
            const r = await req.app.locals.db.collection('songIdeas').insertOne(songIdea);
            if (r.result.ok && r.insertedCount === 1) {
                delete songIdea._id;
                songIdea.id = r.insertedId;
                res.status(201).location(`api/users/${user.id}/song-ideas/${songIdea.id}`).json(songIdea);
            } else {
                sendErrorResponse(req, res, 500, `Unable to create song idea: ${songIdea.title}`);
            }
        } catch (err) {
            console.log(`Unable to create song idea: ${songIdea.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create song idea: ${songIdea.title}`, err);
        }
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid song idea data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.get('/:songIdeaId', async (req, res, next) => {
    const user = res.locals.user;
    const params = req.params;

    try {
        await indicative.validator.validate(params, { songIdeaId: 'required|regex:^[0-9a-f]{24}$' });
        const songIdea = await req.app.locals.db.collection('songIdeas').findOne({
            _id: new ObjectID(params.songIdeaId),
            userId: new ObjectID(user.id)
        });
        if (!songIdea) {
            sendErrorResponse(req, res, 404, `Song idea with ID=${params.songIdeaId} does not exist for user with ID=${user.id}`);
            return;
        }
        res.json(songIdea);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song idea data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:songIdeaId', async (req, res, next) => {
    const user = res.locals.user;
    const songIdeaId = req.params.songIdeaId;

    try {
        await indicative.validator.validate({ songIdeaId }, { songIdeaId: 'required|regex:^[0-9a-f]{24}$' });

        const old = await req.app.locals.db.collection('songIdeas').findOne({
            _id: new ObjectID(songIdeaId),
            userId: new ObjectID(user.id)
        });
        if (!old) {
            sendErrorResponse(req, res, 404, `Song idea with ID=${songIdeaId} does not exist for user with ID=${user.id}`);
            return;
        }
        const songIdea = req.body;
        if (old._id.toString() !== songIdea.id) {
            sendErrorResponse(req, res, 400, `Song idea ID=${songIdea.id} does not match URL ID=${songIdeaId}`);
            return;
        }

        // await indicative.validator.validate(songIdea, validationRules);

        try {
            r = await req.app.locals.db.collection('songIdeas').updateOne({ _id: new ObjectID(songIdeaId) }, { $set: songIdea });
            if (r.result.ok) {
                delete songIdea._id;
                console.log(`Updated song idea: ${JSON.stringify(songIdea)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new song ideas are the same.`);
                }
                res.json(songIdea);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update song idea with ID=${songIdea.id}: ${songIdea.title}`);
            }
        } catch (err) {
            console.log(`Unable to update song idea with ID=${songIdea.id}: ${songIdea.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to update song idea with ID=${songIdea.id}: ${songIdea.title}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song idea data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:songIdeaId', async (req, res, next) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { songIdeaId: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('songIdeas').findOne({ _id: new ObjectID(params.songIdeaId) });
        if (!old) {
            sendErrorResponse(req, res, 404, `Song idea with ID=${params.songIdeaId} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('songIdeas').deleteOne({ _id: new ObjectID(params.songIdeaId) });
        if (r.result.ok && r.deletedCount === 1) {
            res.json(old);
        } else {
            console.log(`Unable to delete song idea with ID=${old.id}: ${old.title}`);
            sendErrorResponse(req, res, 500, `Unable to delete song idea with ID=${old.id}: ${old.title}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song idea data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;
