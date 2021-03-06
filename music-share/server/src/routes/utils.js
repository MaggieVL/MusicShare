module.exports.sendErrorResponse = function(req, res, status, message, err) {
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

module.exports.replaceId = function(entity) {
    entity.id = entity._id;
    delete entity._id;
    return entity;
}
