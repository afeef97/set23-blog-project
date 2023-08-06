async function isAdmin(req, res, next) {
    if (req.userData.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
}

export default isAdmin;
