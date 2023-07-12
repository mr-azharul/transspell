const crypto = require("crypto");

const generateUniqueId = (prefix) => {
    const timestamp = Date.now().toString().slice(-6);
    const randomBytes = crypto.randomBytes(2);
    const randomValue = randomBytes.readUIntBE(0, 2).toString().slice(-4);
    const unique_id = `${prefix}${timestamp}${randomValue}`;

    return unique_id.toUpperCase();
}

const encryptPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    return `${salt}_$:${hash}`;
};

module.exports = {
    generateUniqueId,
    encryptPassword
}