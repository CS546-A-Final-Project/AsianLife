import validator from "validator";
import { ObjectId } from "mongodb";
const exportedMethods = {
  checkUserName(string, varName) {
    if (!string) throw `You must provide a ${varName}`;
    if (typeof string !== "string") throw `Error:${varName} must be a string`;
    string = string.trim();
    if (string.length === 0)
      throw `${varName} cannot be an empty string or just spaces`;
    if (string.length < 2 || string.length > 25)
      throw `${varName} should be within 2 - 25 characters`;
    var regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(string))
      throw `${varName} must only contain digits and letters`;
    return string;
  },

  checkName(string, varName) {
    if (!string) throw `You must provide a ${varName}`;
    if (typeof string !== "string") throw `Error:${varName} must be a string`;
    string = string.trim();
    if (string.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (string.length < 2 || string.length > 25)
      throw `${varName} should be within 2 - 25 characters`;
    var regex = /^[a-zA-Z]+$/;
    if (!regex.test(string)) throw `${varName} must only contain letters`;
    return string;
  },

  checkString(string, varName) {
    if (!string) throw `You must provide a ${varName}`;
    if (typeof string !== "string") throw `Error:${varName} must be a string`;
    string = string.trim();
    if (string.length === 0)
      throw `${varName} cannot be an empty string or just spaces`;
    return string;
  },

  checkEmail(string, varName) {
    if (!string) throw `You must provide a ${varName}`;
    if (typeof string !== "string") throw `Error:${varName} must be a string`;
    string = string.trim();
    if (string.length === 0)
      throw `${varName} cannot be an empty string or just spaces`;
    if (!validator.isEmail(string)) {
      throw "The email address is not in a valid format!";
    }
    return string;
  },

  checkPassword(password, varName) {
    const passwordRequirements = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };
    const isValidPassword = validator.isStrongPassword(
      password,
      passwordRequirements
    );
    if (password.includes(' '))
      throw `${password} should not contain any space`;
    if (!isValidPassword) {
      throw `${varName} must have ${passwordRequirements.minLength} characters, 
            with at least ${passwordRequirements.minLowercase} lowercase letters, 
            ${passwordRequirements.minUppercase} uppercase letters,
            ${passwordRequirements.minNumbers} numbers,
            and ${passwordRequirements.minSymbols} symbols`;
    }
    return password;
  },

  checkId(id) {
    if (!id) {
      throw "No id provided";
    }

    if (typeof id !== "string" || id.trim() === "") {
      throw "Invalid id provided";
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) {
      throw "Not a valid ObjectId";
    }
    return id;
  },

  checkIfPasswordValid(password) {
    const passwordRequirements = {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 0,
      minNumbers: 1,
      minSymbols: 1,
    };
    const isValidPassword = validator.isStrongPassword(password, passwordRequirements);
    return isValidPassword;
  },
};

export default exportedMethods;
