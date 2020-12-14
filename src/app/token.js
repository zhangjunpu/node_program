const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("./config");
const errorTypes = require("../constants/error");

class TokenManager {
    sign(payload) {
        let result = null;
        try {
            result = jwt.sign(payload, PRIVATE_KEY, {
                algorithm: "RS256",
                expiresIn: 60 * 60 * 24
            });
            return result;
        } catch (error) {
            console.error("TokenManager", error);
            throw error;
        }
    }

    verify(token) {
        if (!token) throw new Error(errorTypes.UNAUTHORIZED);
        token = token.replace("Bearer ", "");
        let result = null;
        try {
            result = jwt.verify(token, PUBLIC_KEY, {
                algorithms: ["RS256"]
            });
            return result;
        } catch (error) {
            console.log("TokenManager", error);
            if (error.message === "jwt expired") {
                error = new Error(errorTypes.TOKEN_EXPIRED);
            }
            throw error;
        }
    };

}

module.exports = new TokenManager();