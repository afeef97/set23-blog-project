function checkReqBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad request",
            message: "Need content to create or modify",
        });
    }
    next();
}

export default checkReqBody;
