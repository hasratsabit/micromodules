const bcrypt = require('bcryptjs');

class PasswordService {
    constructor() {}
    async hashPassword(password) {
        try {
            if(!password) throw new Error("No password was provided.");
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }
    
    async isPasswordMatched(password, hashedPassword) {
        try {
            if(!password || !hashedPassword) throw new Error("Password or hashed password is missing.");
            let isMatched = await bcrypt.compareSync(password, hashedPassword);
            return isMatched; 
        } catch (error) {
            throw error;
        }
    }
}

class PasswordServiceSingleton {
    static getInstance() {
        if(!PasswordServiceSingleton.instance) PasswordServiceSingleton.instance = new PasswordService();
        return PasswordServiceSingleton.instance;
    }
}

module.exports = PasswordServiceSingleton;