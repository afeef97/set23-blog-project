import queryDB from "../database/dbBlog";

async function isAuthor(req, res, next) {
    const blogAuthorID = await queryDB(
        `SELECT author_id FROM blog_posts WHERE slug = $1`,
        [req.params.slug]
    );

    if (
        blogAuthorID.rows[0].author_id === req.userData.id ||
        req.userData.isAdmin
    ) {
        next();
    } else {
        return res.status(401).json({ message: "You are not the author" });
    }
}

export default isAuthor;
