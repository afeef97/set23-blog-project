import queryDB from "../../database/dbBlog";

async function getBlogPage(req, res) {
    const slug = req.params.slug;
    const comments = await queryDB(
        "SELECT first_name, last_name, comment_body, blog_comments.created_at FROM blog_comments INNER JOIN blog_posts ON blog_comments.post_id = blog_posts.id INNER JOIN blog_users ON blog_comments.commenter_id = blog_users.id WHERE blog_posts.slug = $1 AND blog_comments.deleted_at IS NULL",
        [slug]
    );
    const commentsData = comments.rows;

    await queryDB(
        "SELECT blog_posts.id, blog_title, blog_body, first_name, last_name, blog_posts.created_at FROM blog_posts INNER JOIN blog_users ON author_id = blog_users.id WHERE blog_posts.deleted_at IS NULL AND slug = $1",
        [slug]
    )
        .then((resDb) => {
            const blogs = resDb.rows;
            return res
                .status(200)
                .json({ message: "Blogs retrieved", blogs, commentsData });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Server error" }, errDb);
        });
}

export default getBlogPage;
