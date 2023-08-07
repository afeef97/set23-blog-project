import queryDB from "../../database/dbBlog";

async function createComment(req, res) {
    const comment = req.body.comment;
    const commenterID = req.userData.id;
    const post = await queryDB("SELECT id FROM blog_posts WHERE slug = $1", [
        req.params.slug,
    ]);
    const postID = post.rows[0].id;

    await queryDB(
        "INSERT INTO blog_comments (post_id, commenter_id, comment_body) VALUES ($1, $2, $3)",
        [postID, commenterID, comment]
    )
        .then((resDb) => {
            return res
                .status(200)
                .json({ message: "Comment created successfully" });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Server error", errDb });
        });
}

export default createComment;
