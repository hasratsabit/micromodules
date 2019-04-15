const jwt = require('jsonwebtoken');
class TokenService {
    constructor() {}

    showError() {
        throw new Error('Please provide a payload and a secret key.');
    }

    isTokenExpired(token) {
        try {
            if (!token) throw Error('Please provide token.');
            let {
                exp
            } = token;
            let now = new Date().getTime() / 1000;
            if (exp < now) return true;
            return false;
        } catch (error) {
            throw error;
        }
    }

    generateToken(payload = {}, secret = '') {
        try {
            if (!payload || (!secret || secret.length === 0)) this.showError();
            let token = jwt.sign(payload, secret, {
                expiresIn: '24h'
            }).toString();
            return token;
        } catch (error) {
            throw error;
        }
    }

    decodeToken(token, secret = '') {
        try {
            if (!token || (!secret || secret.length === 0)) this.showError();
            if (this.isTokenExpired(token)) throw new Error(`Expired token: ${token}`);
            let decoded = jwt.decode(token, secret);
            if (!decoded) throw new Error('Token is not valid.');
            return decoded;
        } catch (error) {
            throw error;
        }
    }
}


class TokenServiceSingleton {
    static getInstance() {
        if (!TokenServiceSingleton.instance) TokenServiceSingleton.instance = new TokenService();
        return TokenServiceSingleton.instance;
    }
}


module.exports = TokenServiceSingleton;