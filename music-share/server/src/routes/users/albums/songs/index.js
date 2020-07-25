const express = require('express');
const indicative = require('indicative');
//const validationRules = require('./validation-rules');
const sendErrorResponse = require('../../../utils').sendErrorResponse;
const replaceId = require('../../../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

router.get('/', async (req, res, next) => {
    const user = res.locals.user;
    const album = res.locals.album;

    try {
        const songs = await req.app.locals.db.collection('songs').find({
          userId: new ObjectID(user.id),
          albumId: new ObjectID(album.id),
        }).toArray();
        res.json(songs.map(song => replaceId(song)));
    } catch (errors) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.post('/', async (req, res, next) => {
    const user = res.locals.user;
    const album = res.locals.album;
    const songId = req.body;

    try {
        await indicative.validator.validate({ songId }, { songId: 'required|regex:^[0-9a-f]{24}$' });

        const old = await req.app.locals.db.collection('songs').findOne({
            _id: new ObjectID(songId),
            userId: new ObjectID(user.id)
        });
        if (!old) {
            sendErrorResponse(req, res, 404, `Song with ID=${songId} does not exist for user with ID=${user.id}`);
            return;
        }

        try {
            r = await req.app.locals.db.collection('songs').updateOne({
              _id: new ObjectID(songId),
            }, { $set: { albumId: new ObjectID(album.id) } });
            if (r.result.ok) {
                replaceId(old);
                old.albumId = album.id;
                console.log(`Assigned song ${old.title} to album with ID=${album.id}`);
                if (r.modifiedCount === 0) {
                    console.log(`Song ${old.title} already assigned to album with ID=${album.id}`);
                }
                res.json(old);
            } else {
                sendErrorResponse(req, res, 500, `Unable to update song with ID=${songId}: ${old.title}`);
            }
        } catch (err) {
            console.log(`Unable to assign song ${old.title} to album with ID=${album.id}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Unable to assign song ${old.title} to album with ID=${album.id}`, err);
        }
    } catch(errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid songId: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:songId', async (req, res, next) => {
    const user = res.locals.user;
    const album = res.locals.album;
    const songId = req.param.songId;

    try {
        await indicative.validator.validate({ songId }, { songId: 'required|regex:^[0-9a-f]{24}$' });

        const old = await req.app.locals.db.collection('songs').findOne({
          _id: new ObjectID(songId),
          userId: user.id,
          albumId: album.id,
        });
        if (!old) {
            sendErrorResponse(req, res, 404, `Song with ID=${songId} does not exist for user with ID=${user.id} and album with ID=${album.id}`);
            return;
        }
        replaceId(old);

        r = await req.app.locals.db.collection('songs').updateOne({
          _id: new ObjectID(songId),
        }, { $unset: { albumId: "" } });
        if (r.result.ok) {
          console.log(`Unassigned song ${old.title} from album with ID=${album.id}`);
          if (r.modifiedCount === 0) {
              console.log(`Song ${old.title} is not assigned to album with ID=${album.id}`);
          }
          res.json(old);
        } else {
          console.log(`Unable to unassign song with ID=${old.id}: ${old.title} from album with ID=${album.id}`);
          sendErrorResponse(req, res, 500, `Unable to unassign song with ID=${old.id}: ${old.title} from album with ID=${album.id}`);
        }
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid songId: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

module.exports = router;
