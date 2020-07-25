const express = require('express');
const userRoutes = require('./users');
const replaceId = require('./utils').replaceId;

const router = express.Router();

router.use('/users', userRoutes);

router.get('/songs', async (req, res) => {
    try {
        const songs = await req.app.locals.db.collection('songs').find().toArray();
        res.json(songs.map(song => replaceId(song)));
    } catch (errors) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

module.exports = router;
