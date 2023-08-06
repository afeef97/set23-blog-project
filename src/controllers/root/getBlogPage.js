import queryDB from "../../database/dbBlog";

async function getBlogPage(req, res) {
    await queryDB(
        "SELECT blog_posts.id, blog_title, blog_body, first_name, last_name, blog_posts.created_at FROM blog_posts INNER JOIN blog_users ON author_id = blog_users.id WHERE blog_posts.deleted_at IS NULL AND slug = $1",
        [req.params.slug]
    )
        .then((resDb) => {
            const blogs = resDb.rows;
            return res.status(200).json({ message: "Blogs retrieved", blogs });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Server error" }, errDb);
        });
}

export default getBlogPage;
