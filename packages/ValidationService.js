class ValidationService {
    constructor() {}

    validateLength(options) {
        if (options.fieldsToCheck.length === 0) return null;
        let defaultOptions = {
            sourceObject: {},
            fieldsToCheck: [],
            min: 3,
            max: 15
        }

        for (let prop in defaultOptions) {
            if(options.hasOwnProperty(prop)) defaultOptions[prop] = options[prop];
        }

        let minLength = defaultOptions.min;
        let maxLength = defaultOptions.max;
        let validationResponse = {
            success: true
        }
        for (let field of defaultOptions.fieldsToCheck) {
            let fieldLength = defaultOptions.sourceObject[field].trim().length;
            if (fieldLength < minLength || fieldLength > maxLength) {
                validationResponse = {
                    success: false,
                    message: `${field || "field"} must be at least ${minLength} but not longer than ${maxLength}.`
                }
            }
        }
        return validationResponse;
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

    validateString(options) {
        if (!options.fieldsToCheck || options.fieldsToCheck.length === 0) throw new Error("No field names are provided.");
        let defaultOptions = {
            sourceObject: {},
            fieldsToCheck: []
        }
        for (let prop in defaultOptions) {
            if (options.hasOwnProperty(prop)) defaultOptions[prop] = options[prop];
        }
        let validationResponse = {
            success: true,
        }
        let regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        for (let field of defaultOptions.fieldsToCheck) {
            if (!regExp.test(defaultOptions.sourceObject[field])) {
                validationResponse.success = false;
                validationResponse.message = `${field || "field"} can only contain numbers and letters.`;
            }
        }
        return validationResponse;
    }
}


class ValidationServiceSingleton {
    static getInstance() {
        if (!ValidationServiceSingleton.instance) ValidationServiceSingleton.instance = new ValidationService();
        return ValidationServiceSingleton.instance;
    }
}

module.exports = ValidationServiceSingleton;