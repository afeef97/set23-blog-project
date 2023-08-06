import bcrypt from "bcryptjs"

function hashPassword(password) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
}

export default hashPassword;