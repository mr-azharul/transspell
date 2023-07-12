const jwt = require("jsonwebtoken");

module.exports = {
    authentication: function (req, res, next) {
        let bearerHeader = req.headers.authorization && req.headers.authorization != "" ? req.headers.authorization : undefined;
        if (bearerHeader && bearerHeader != undefined && typeof bearerHeader != 'undefined') {
            let token = bearerHeader.split(' ')[1];
            try {
                const auth = jwt.verify(token.trim(), process.env.TOKEN_KEY);
                req.token = token;
                req.user = auth.user;
                req.id = auth.request.id;
                return next();
            } catch (error) {
                return res.status(401).json({ msg: "Unauthorized!", data: error });
            }
        }
        
        return res.status(401).json({ msg: "Unauthorized!", data: {} });
    }
};