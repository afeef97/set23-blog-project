import queryDB from "../../database/dbBlog";

async function createBlogPost(req, res) {
    const { blogTitle, blogBody, coverImage } = req.body;
    const slug = String(blogTitle).replaceAll(" ", "-").toLowerCase();
    const authorID = req.userData.id;

    await queryDB(
        "INSERT INTO blog_posts (author_id, blog_title, blog_body, slug) VALUES ($1, $2, $3, $4)",
        [authorID, blogTitle, blogBody, slug]
    )
        .then(function (resDb) {
            res.status(200).json({ message: "New blog post created" });
        })
        .catch(function (errDb) {
            res.status(500).json({ message: "Server error", errDb });
        });
}

export default createBlogPost;
