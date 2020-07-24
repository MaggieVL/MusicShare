const indicative = require('indicative');
const sendErrorResponse = require('../utils').sendErrorResponse;
const replaceId = require('../utils').replaceId;
const ObjectID = require('mongodb').ObjectID;

module.exports = async function(req, res, next) {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { userId: 'required' });
        const user = await req.app.locals.db.collection('users').findOne({ _id: new ObjectID(params.userId) });
        if (!user) {
            sendErrorResponse(req, res, 404, `User with ID=${params.userId} does not exist`);
            return;
        }
        res.locals.user = replaceId(user);
        console.log("middleware: " + res.locals.user);
        next();
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors}`, errors);
    }
}
