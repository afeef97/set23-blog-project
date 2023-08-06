import queryDB from "../database/dbBlog";

async function isAuthor(req, res, next) {
    console.log(req.params, req.userData, req.body);

    const blogAuthorID = await queryDB(
        `SELECT author_id FROM blog_posts WHERE slug = '${req.params.slug}'`
    );

    if (blogAuthorID === req.userData.id || req.userData.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "You are not the author" });
    }
}

export default isAuthor;
