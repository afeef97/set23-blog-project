import queryDB from "../../database/dbBlog";

async function editBlogPost(req, res) {
    const body = req.body;
    const slug = req.params.slug;

    if (Object.keys(req.body).length === 0) {
        return res
            .status(400)
            .json({ error: "Bad request", message: "Nothing to edit" });
    }

    const columns = [];
    const values = [];
    let paramIndex = 1;

    Object.entries(body).forEach(([key, value]) => {
        columns.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
    });

    columns.push(`slug = $${paramIndex}`);
    paramIndex++;
    values.push(String(req.body.blog_title).replaceAll(" ", "-").toLowerCase());

    columns.push("updated_at = CURRENT_TIMESTAMP");

    const queryStr = `UPDATE blog_posts SET ${columns.join(
        ", "
    )} WHERE slug = $${paramIndex}`;
    values.push(slug);

    await queryDB(queryStr, values);
    res.status(200).json({ message: "Blog updated" });
}

export default editBlogPost;
