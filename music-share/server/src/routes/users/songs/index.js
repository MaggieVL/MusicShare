const express = require('express');
const indicative = require('indicative');
//const validationRules = require('./validation-rules');
const sendErrorResponse = require('../../utils').sendErrorResponse;
const replaceId = require('../../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;
const { uuid } = require('uuidv4');
var multer  = require('multer');

const SONGS_PATH = './static/songs';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, SONGS_PATH);
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
        const songs = await req.app.locals.db.collection('songs').find({ userId: new ObjectID(user.id) }).toArray();
        res.json(songs.map(song => replaceId(song)));
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
    const song = {...data, audiofileName};
    console.log("song: " + song);

    try {
        //await indicative.validator.validate(data, validationRules);

        try {
            song.userId = new ObjectID(user.id);
            const r = await req.app.locals.db.collection('songs').insertOne(song);
            if (r.result.ok && r.insertedCount === 1) {
                delete song._id;
                song.id = r.insertedId;
                res.status(201).location(`api/users/${user.id}/songs/${song.id}`).json(song);
            } else {
                sendErrorResponse(req, res, 500, `Unable to create song: ${song.title}`);
            }
        } catch (err) {
            console.log(`Unable to create song: ${song.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to create song: ${song.title}`, err);
        }
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid song data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.get('/:songId', async (req, res, next) => {
    const user = res.locals.user;
    const params = req.params;

    try {
        await indicative.validator.validate(params, { songId: 'required|regex:^[0-9a-f]{24}$' });
        const song = await req.app.locals.db.collection('songs').findOne({
            _id: new ObjectID(params.songId),
            userId: new ObjectID(user.id)
        });
        if (!song) {
            sendErrorResponse(req, res, 404, `Song with ID=${params.songId} does not exist for user with ID=${user.id}`);
            return;
        }
        res.json(user);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.put('/:songId', async (req, res, next) => {
    const user = res.locals.user;
    const songId = req.params.songId;
    const old = await req.app.locals.db.collection('songs').findOne({
        _id: new ObjectID(songId),
        userId: new ObjectID(user.id)
    });
    if (!old) {
        sendErrorResponse(req, res, 404, `Song with ID=${songId} does not exist for user with ID=${user.id}`);
        return;
    }
    const song = req.body;
    if (old._id.toString() !== song.id) {
        sendErrorResponse(req, res, 400, `Song ID=${song.id} does not match URL ID=${songId}`);
        return;
    }
    try {
        await indicative.validator.validate(song, validationRules);
        try {
            r = await req.app.locals.db.collection('songs').updateOne({ _id: new ObjectID(songId) }, { $set: song });
            if (r.result.ok) {
                delete song._id;
                console.log(`Updated song: ${JSON.stringify(song)}`);
                if (r.modifiedCount === 0) {
                    console.log(`The old and the new songs are the same.`);
                }
                res.json(song);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update song with ID=${song.id}: ${song.title}`);
            }
        } catch (err) {
            console.log(`Unable to update song with ID=${song.id}: ${song.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to update song with ID=${song.id}: ${song.title}`, err);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:songId', async (req, res, next) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { songId: 'required|regex:^[0-9a-f]{24}$' });
        const old = await req.app.locals.db.collection('songs').findOne({ _id: new ObjectID(params.songId) });
        if (!old) {
            sendErrorResponse(req, res, 404, `Song with ID=${params.songId} does not exist`);
            return;
        }
        replaceId(old);
        const r = await req.app.locals.db.collection('songs').deleteOne({ _id: new ObjectID(params.songId) });
        if (r.result.ok && r.deletedCount === 1) {
            res.json(old);
        } else {
            console.log(`Unable to delete song with ID=${old.id}: ${old.title}`);
            sendErrorResponse(req, res, 500, `Unable to delete song with ID=${old.id}: ${old.title}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid song data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;
