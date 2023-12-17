import { users } from "./config/mongoCollections.js";
import { stores } from "./config/mongoCollections.js";
import bcrypt from 'bcrypt';
import { ObjectId } from "mongodb";

const toHashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const checkIfEmailExists = async (email) => {
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === email) {
            return true;
        }
    }
    return false;
};

const checkIfEmailExistsExceptMe = async (emailNow, email) => {
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === emailNow) {
            continue;
        }
        if (user.email === email) {
            return true;
        }
    }
    return false;
};

const checkIfPasswordCorrect = async (email, password) => {
    let compareToMatch = false;
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === email) {
            compareToMatch = await bcrypt.compare(password, user.hashPassword);
            return compareToMatch;
        }
    }
    return compareToMatch;
}

const getUserInfoByEmail = async (email) => {
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === email) {
            return {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                ownedStoreId: user.ownedStoreId
            }
        }
    }
}

const checkId = (id, varName) => {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
        throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} id is invalid object ID`;
    return id;
};

const checkString = (strVal, varName) => {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim(); // already trimmed
    if (strVal.length === 0)
        throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    return strVal;
};
const checkCategories = (categoryToCheck) => {
    categoryToCheck = checkString(categoryToCheck, 'categoryToCheck'); // 假设这个函数验证并转换为字符串

    const categories = [
        "Fresh Produce",
        "Dairy Products",
        "Meat and Poultry",
        "Seafood",
        "Frozen Foods",
        "Bakery and Confectionery",
        "Beverages",
        "Snacks",
        "Canned and Jarred Goods",
        "Dry Goods and Staples"
    ];

    if (!categories.includes(categoryToCheck)) {
        throw (`The category ${categoryToCheck} is not a recognized category.`);
    }
    return categoryToCheck;
}
const checkPrice = (productPrice) => {
    if (typeof productPrice !== "number"){
        throw (`ProductPrice should be a number`);
    }
        
    const reguExForPrice = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
    if (!reguExForPrice.test(productPrice.toString())) {
        throw (`ProductPrice should be a positive whole number, positive 2 decimal place float.`);
    }      
    
    return productPrice;
};
const checkReview = (review) => {
    review = checkString(review, "review"); // description are already trimmed
    if (review.length < 25 || review.length > 200)
        throw `This product's review should not be less than 25 characters.`;
    return review;
};
const checkDateFormat = (eventDate, varName) => {
    eventDate = checkString(eventDate, varName);
    // ChatGPT: Valid Date format "MM/DD/YYYY"
    const reguExForDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!eventDate.match(reguExForDate))
        throw (`This event's date ${varName} is not in the expected 'MM/DD/YYYY' format.`);

    // ChatGPT: Check if it is a valid date
    const [month, day, year] = eventDate.split("/").map(Number); // split and convert string into number
    const dateObj = new Date(year, month - 1, day); // create a date object with the input date
    if (
        dateObj.getDate() !== day ||
        dateObj.getMonth() !== month - 1 ||
        dateObj.getFullYear() !== year
    ) {
        throw (`Invalid date for ${varName} was provided, like 02/30 or 11/31.`);
    }
    return eventDate;
};
const checkDateValid = (manufactureDate, expiryDate) => {
    // 确保日期是Date对象
    const [month, day, year] = manufactureDate.split("/").map(Number);
    const [monthE, dayE, yearE] = expiryDate.split("/").map(Number);
    const manufactureDateObj = new Date(year, month - 1, day);
    // console.log(manufactureDateObj);
    const expiryDateObj = new Date(yearE, monthE - 1, dayE);

    if (isNaN(manufactureDateObj.getTime()) || isNaN(expiryDateObj.getTime())) {
        throw new Error("Invalid date format");
    }
    // expiryDate should be late than current Date
    const currDate = new Date();
    if (manufactureDateObj > currDate) {
        throw new Error(`Manufacture Date should not be future date`);
    }
    if (expiryDateObj <= currDate) {
        throw new Error(`Expiry Date should be future date`);
    }

    // manufacturedDate should be earlier than expiryDate
    return manufactureDateObj < expiryDateObj;
}
const checkRating = (rating) => {
    if (typeof rating != "number"){
        throw (`The product's rating should be a number`);
    }
    if (!Number.isInteger(rating)) {
        throw ('Rating must be an integer');
    }
    if (rating < 1 || rating > 5) {
        throw ('Rating must be between 1 and 5');
    }
    return rating
}

const checkIfStoreNameExists = async (name) => {
    name = name.replace(/\s/g, "").toLowerCase();
    const storeCollection = await stores();
    const storeList = await storeCollection.find().toArray();
    for (let store of storeList) {
        if (store.name.replace(/\s/g, "").toLowerCase() === name) {
            return true;
        }
    }
    return false;
};

export default {
    toHashPassword,
    checkIfEmailExists,
    checkIfEmailExistsExceptMe,
    checkIfPasswordCorrect,
    getUserInfoByEmail,
    checkId,
    checkString,
    checkPrice,
    checkReview,
    checkDateFormat,
    checkDateValid,
    checkCategories,
    checkRating,
    checkIfStoreNameExists,
};