import queryDB from "../../database/dbBlog";

async function getBlogs(req, res) {
    await queryDB(
        "SELECT blog_title, first_name, last_name, blog_posts.created_at, slug FROM blog_posts INNER JOIN blog_users ON author_id = blog_users.id WHERE blog_posts.deleted_at IS NULL"
    )
        .then((resDb) => {
            const blogs = resDb.rows;
            return res.status(200).json({ message: "Blogs retrieved", blogs });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Server error" });
        });
}

export default getBlogs;
