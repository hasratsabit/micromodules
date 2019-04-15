class ValidationService {
    constructor() {}

    checkLength(string, options = {}) {
        try {
            if (!string) throw new Error("No string was provided.");
            string = string.trim();
            let defaultOptions = {};
            let response = {
                success: true
            };
            defaultOptions.min = options.min || 8;
            defaultOptions.max = options.max || 15;
            if (string.length < defaultOptions.min || string.length > defaultOptions.length) {
                response.success = false;
                response.message = `Text must be at least ${defaultOptions.min}, but no more than ${defaultOptions.max} characters.`;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    numberCheck(number) {
        try {
            if (!number) throw new Error("No number was provided.");
            let response = {
                isValid: true
            };
            let regExp = new RegExp('^[0-9]+$');
            if (!regExp.test(number)) {
                response.message = "This field can only accept number.";
                response.isValid = false;
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    checkString(string = '') {
        try {
            if (!string || string.length === 0) throw new Error("No string was provided.");
            let response = {
                isValid: true
            };
            let regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
            if (!regExp.test(string)) {
                response.isValid = false;
                response.message = "String can only contain numbers and letters.";
            }
            return response;
        } catch (error) {
            throw error;
        }
    }
}


class ValidationServiceSingleton {
    static getInstance() {
        if (!ValidationServiceSingleton.instance) ValidationServiceSingleton.instance = new ValidationService();
        return ValidationServiceSingleton.instance;
    }
}

module.exports = ValidationServiceSingleton;