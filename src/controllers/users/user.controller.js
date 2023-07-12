const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/User");
const Helper = require("../../utils/helper.util");

const createUser = async (req, res) => {
    try {
        let body = req.body;
        const user = await User.findOne({ email: body.email }).lean();
        if (!user) {
            const salt = crypto.randomBytes(16).toString("hex");
            const hash = crypto.pbkdf2Sync(body.password, salt, 1000, 64, "sha512").toString("hex");
            body["password"] = `${salt}_$:${hash}`;
            body["id"] = Helper.generateUniqueId("US");

            const newUser = await User.create(body);
            return res.status(201).json({ msg: "User Created", data: newUser });
        }

        return res.status(409).json({ msg: "User already exists", data: user });
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await User.findOne({ email: email }).lean();
        if (!user) {
            return res.status(400).json({ msg: "Invalid Email or Password" });
        }

        const [salt, hash] = user.password.split("_$:");
        const validPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex") === hash;
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        if (user.status !== "active") {
            return res.status(403).json({ msg: "Your account is not active, Please contact with admin" });
        }

        const token = jwt.sign({ id: user.id, password: user.password }, process.env.TOKEN_KEY, { expiresIn: '8h' });
        return res.json({ msg: "Login Success", token, data: user });
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

const resetPassword = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.newPassword) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const password = Helper.encryptPassword(req.body.password);
        const newPassword = Helper.encryptPassword(req.body.newPassword);
        const user = await User.findOne({ email: req.body.email }).lean();
        if (!user) {
            return res.status(400).json({ msg: "Invalid Email or Password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const update = await User.updateOne({ email: req.body.email }, { password: newPassword, reset_password: false });
        return res.json({ msg: "Password Upadated", data: update })
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

const userDetails = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id }).lean();
        if (!user) {
            return res.status(204).json({ msg: "No User Found" });
        }

        return res.json({ msg: "User Fetched", data: user });
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

module.exports = {
    createUser,
    userSignIn,
    resetPassword,
    userDetails
}