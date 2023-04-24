const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
    _expiresInAccess;
    _expiresInRefresh;
    constructor() {
        this._expiresInAccess = '30m';
        this._expiresInRefresh = '30d';
    }

    async generateTokens(user) {
        const payload = {
            id: user.id,
            email: user.email,
            isActivated: user.isActivated,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET_KEY_FOR_JWT, {
            expiresIn: this._expiresInAccess,
        });

        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_FOR_REFRESH, {
            expiresIn: this._expiresInRefresh,
        });

        return {
            accessToken,
            refreshToken
        };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await tokenModel.create({ user: userId, refreshToken });
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken });
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY_FOR_JWT);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY_FOR_REFRESH);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();