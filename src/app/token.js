const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("./config");

class TokenManager {
    sign(payload) {
        return jwt.sign(payload, PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 60 * 60 * 24
        });
    }

    verify(token) {
        if (!token) return null;
        token = token.replace("Bearer ", "");
        return jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
    }
}

module.exports = new TokenManager();