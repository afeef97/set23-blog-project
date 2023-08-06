import queryDB from "../../database/dbBlog";
import hashPassword from "./hashPassword";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
    const { username, email, password, f_name, l_name } = req.body;
    const isAdmin = req.body?.isAdmin ? true : false;
    const hashedPassword = hashPassword(password);

    await queryDB(
        "INSERT INTO blog_users (user_email, username, user_password, first_name, last_name, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
        [email, username, hashedPassword, f_name, l_name, isAdmin]
    ).then(function(resDb) {
        res.status(200).json({ message: "New user created" })
    }).catch(function (errDb) {
        res.status(500).json({ message: "Server error", errDb })
    })
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}