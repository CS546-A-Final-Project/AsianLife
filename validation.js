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

  checkIfLocationValid(location) {
    if (typeof location !== "object") {
      throw "The location is not an object!";
    }
    if (location.address === undefined) {
      throw "The address is not supplied!";
    }
    if (location.city === undefined) {
      throw "The city is not supplied!";
    }
    if (location.state === undefined) {
      throw "The state is not supplied!";
    }
    if (location.zip === undefined) {
      throw "The zip is not supplied!";
    }
    if (typeof location.address !== "string") {
      throw "The address must be a string!";
    }
    if (typeof location.city !== "string") {
      throw "The city must be a string!";
    }
    if (typeof location.state !== "string") {
      throw "The state must be a string!";
    }
    if (typeof location.zip !== "string") {
      throw "The zip must be a string!";
    }
    if (location.address.trim().length < 3) {
      throw "Address is less than 3 characters!";
    }
    if (location.city.trim().length < 3) {
      throw "City is less than 3 characters!";
    }
    let states = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];
    if (!states.includes(location.state.trim().toUpperCase())) {
      throw "State must be valid selected from the list";
    }
    if (location.zip.trim().length !== 5) {
      throw "Zip must contains 5 numbers!";
    }
    for (let i of location.zip.trim()) {
      if (i < '0' || i > '9') {
        throw "Zip must contain only numbers!";
      }
    }
  },

  checkIfPhoneNumberValid(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber))
      throw "US phone number must contain 10 digits numbers";
  },

  checkIfStoreNameValid(storeName) {
    const storeNameRegex = /^[a-zA-Z0-9\s\-&',.()]{3,25}$/;
    if (!storeNameRegex.test(storeName)) {
      throw "Invalid store name (the store name should be 3 to 25 characters)";
    }
  }
};

export default exportedMethods;
