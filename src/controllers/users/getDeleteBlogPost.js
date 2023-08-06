import queryDB from "../../database/dbBlog";

async function deleteBlogPost(req, res) {
    const slug = req.params.slug;

    await queryDB("DELETE FROM blog_posts WHERE slug = $1", [slug])
        .then((resDb) => {
            return res
                .status(200)
                .json({ message: "Blog deleted successfully" });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Delete failed" });
        });
}

export default deleteBlogPost;
