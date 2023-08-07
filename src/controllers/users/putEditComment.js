import queryDB from "../../database/dbBlog";

async function editComment(req, res) {
    const commentBody = req.body.comment;
    const commentID = req.query.commentID;
    const slug = req.params.slug;
    console.log(req.userData.isAdmin);

    const commentPost = await queryDB(
        "SELECT * FROM blog_comments INNER JOIN blog_posts ON post_id = blog_posts.id WHERE blog_comments.id = $1 AND blog_posts.slug = $2",
        [commentID, slug]
    );
    console.log(commentPost.rows);

    if (commentPost.rows.length === 0) {
        return res
            .status(401)
            .json({ message: "Comment does not belong to this post" });
    }

    const commenterID = commentPost.rows[0].commenter_id;

    if (commenterID === req.userData.id || req.userData.isAdmin) {
        await queryDB(
            "UPDATE blog_comments SET comment_body = $1, updated_at = CURRENT_TIMESTAMP WHERE blog_comments.id = $2",
            [commentBody, commentID]
        )
            .then((resDb) => {
                return res.status(200).json({ message: "Comment updated" });
            })
            .catch((errDb) => {
                return res.status(500).json({ message: "Server error", errDb });
            });
    } else {
        return res
            .status(401)
            .json({ message: "You can only edit your own comment" });
    }
}

export default editComment;
