const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

require("dotenv").config();
require("./src/config/database");

const app = express();
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use('/api', require('./src/routes'));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.get("/api/status", (req, res) => {
    const OS = require("os");
    const info = {
        cpus: OS.cpus(),
        arch: OS.arch(),
        totalmem: OS.totalmem(),
        freemem: OS.freemem(),
        platform: OS.platform()
    }

    return res.json({ msg: "success", data: info });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});