import { users } from "./config/mongoCollections.js";
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
    if (!ObjectId.isValid(id)) throw `Error: ${varName} id invalid object ID`;
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
        throw new Error(`The category ${categoryToCheck} is not a recognized category.`);
    }
    return categoryToCheck;
}
const checkPrice = (productPrice) => {
    if (typeof productPrice != "number"){
        throw new Error (`productPrice ${productPrice} should be a number`);
    }
        
    const reguExForPrice = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
    if (!reguExForPrice.test(productPrice.toString())) {
        throw new Error(`${productPrice} should be a positive whole number, positive 2 decimal place float.`);
    }      
    
    return productPrice;
};
const checkReview = (review) => {
    review = checkString(review, "review"); // description are already trimmed
    if (review.length < 25)
        throw `This product's review ${review} should not be less than 25 characters.`;
    return review;
};
const checkDateFormat = (eventDate, varName) => {
    eventDate = checkString(eventDate, varName);
    // ChatGPT: Valid Date format "MM/DD/YYYY"
    const reguExForDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!eventDate.match(reguExForDate))
        throw new Error(`This event's date ${eventDate} is not in the expected 'MM/DD/YYYY' format.`);

    // ChatGPT: Check if it is a valid date
    const [month, day, year] = eventDate.split("/").map(Number); // split and convert string into number
    const dateObj = new Date(year, month - 1, day); // create a date object with the input date
    if (
        dateObj.getDate() !== day ||
        dateObj.getMonth() !== month - 1 ||
        dateObj.getFullYear() !== year
    ) {
        // if the newly created date object does not match the regular date (09/31 => 10/1)
        throw new Error(`Invalid date ${eventDate} was provided, like 02/30 or 11/31.`);
    }
    // // Compare date: https://stackoverflow.com/questions/15063670/compare-string-with-todays-date-in-javascript
    // const currDate = new Date();
    // if (dateObj <= currDate) throw `${eventDate} should be future events`;
    return dateObj;
};
const checkDateValid = (manufactureDateObj, expiryDateObj) => {
    // 确保日期是Date对象
    // const [month, day, year] = manufactureDate.split("/").map(Number);
    // const [monthE, dayE, yearE] = expiryDate.split("/").map(Number);
    // const manufactureDateObj = new Date(year, month - 1, day);
    // console.log(manufactureDateObj);
    // const expiryDateObj = new Date(yearE, monthE - 1, dayE);
    // console.log(expiryDateObj);

    // check if it is a valid date
    if (isNaN(manufactureDateObj.getTime()) || isNaN(expiryDateObj.getTime())) {
        throw new Error("Invalid date format");
    }
    // expiryDate should be late than current Date
    const currDate = new Date();
    if (manufactureDateObj > currDate) {
        throw new Error(`Manufacture Date ${manufactureDateObj} should not be future date`);
    }
    if (expiryDateObj <= currDate) {
        throw new Error(`Expiry Date ${expiryDateObj} should be future date`);
    }

    // manufacturedDate should be earlier than expiryDate
    return manufactureDateObj < expiryDateObj;
}
const checkRating = (rating) => {
    if (typeof productPrice != "number"){
        throw new Error (`productPrice ${productPrice} should be a number`);
    }
    if (!Number.isInteger(rating)) {
        throw new Error('Rating must be an integer');
    }
    if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
    }


}

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
    checkRating
};