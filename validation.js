import validator from 'validator';
const exportedMethods = {
    checkUserName(string, varName) {
        if (!string) throw `You must provide a ${varName}`;
        if (typeof string !== 'string') throw `Error:${varName} must be a string`;
        string = string.trim();
        if (string.length === 0)
            throw `${varName} cannot be an empty string or just spaces`;
        var regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(string))
            throw `${varName} must only contain digits and letters`;
        return string;
    },

    checkName(string, varName) {
        if (!string) throw `You must provide a ${varName}`;
        if (typeof string !== 'string') throw `Error:${varName} must be a string`;
        string = string.trim();
        if (string.length === 0)
            throw `Error: ${varName} cannot be an empty string or just spaces`;
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(string))
            throw `${varName} must only contain letters`;
        return string;
    },

    checkString(string, varName) {
        if (!string) throw `You must provide a ${varName}`;
        if (typeof string !== 'string') throw `Error:${varName} must be a string`;
        string = string.trim();
        if (string.length === 0)
            throw `${varName} cannot be an empty string or just spaces`;
        return string;
    },

    checkEmail(string, varName) {
        if (!string) throw `You must provide a ${varName}`;
        if (typeof string !== 'string') throw `Error:${varName} must be a string`;
        string = string.trim();
        if (string.length === 0)
            throw `${varName} cannot be an empty string or just spaces`;
        if (!validator.isEmail(string)) {
            throw "The email address is not in a valid format!";
        }
        return string;
    },

    checkPassword(password) {
        const passwordRequirements = {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        };
        const isValidPassword = validator.isStrongPassword(password, passwordRequirements);
        if (!isValidPassword) {
            throw `Password must have ${passwordRequirements.minLength} characters, 
            with at least ${passwordRequirements.minLowercase} lowercase letters, 
            ${passwordRequirements.minUppercase} uppercase letters,
            ${passwordRequirements.minNumbers} numbers,
            and ${passwordRequirements.minSymbols} symbols`
        }
        return password;
    }
}

export default exportedMethods;