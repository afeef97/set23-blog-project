import queryDB from "../../database/dbBlog";

async function getUsers(req, res) {
    await queryDB("SELECT * FROM blog_users WHERE deleted_at IS NULL")
        .then((resDb) => {
            const users = resDb.rows;
            return res.status(200).json({ message: "Users retrieved", users });
        })
        .catch((errDb) => {
            return res.status(500).json({ message: "Server error", errDb });
        });
}

export default getUsers;
