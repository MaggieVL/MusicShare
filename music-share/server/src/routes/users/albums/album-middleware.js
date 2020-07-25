const indicative = require('indicative');
const sendErrorResponse = require('../../utils').sendErrorResponse;
const replaceId = require('../../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;

module.exports = async function(req, res, next) {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { albumId: 'required' });
        const album = await req.app.locals.db.collection('albums').findOne({ _id: new ObjectID(params.albumId) });
        if (!album) {
            sendErrorResponse(req, res, 404, `Album with ID=${params.albumId} does not exist`);
            return;
        }
        res.locals.album = replaceId(album);
        console.log("middleware: " + res.locals.album);
        next();
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid album data: ${errors}`, errors);
    }
}
