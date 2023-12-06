import { users } from "./config/mongoCollections.js";
import bcrypt from 'bcrypt';


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
const checkClass = (productClass) => {
    productClass = checkString(productClass, 'productClass');
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
    if (productClass.includes(categories.toLowerCase())) {
        throw new Error (`${productClass} should be in right categories`);
    }
}
const checkPrice = (productPrice) => {
    if (typeof productPrice != "number")
        throw `productPrice ${productPrice} should be a number`;

    const reguExForPrice = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;

    if (!reguExForPrice.test(productPrice.toString()))
        throw new Error(`${productPrice} should be a positive whole number, positive 2 decimal place float.`);
};
const checkDescription = (description) => {
    description = checkString(description, "description"); // description are already trimmed
    if (description.length < 25)
      throw `This event's description ${description} should not be less than 25 characters.`;
    return description;
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
    // Compare date: https://stackoverflow.com/questions/15063670/compare-string-with-todays-date-in-javascript
    const currDate = new Date();
    if (dateObj <= currDate) throw `${eventDate} should be future events`;
    return eventDate;
  };
const checkDateValid = (manufactureDate, expiryDate) => {
    // 确保日期是Date对象
    const manufactureDateObj = new Date(manufactureDate);
    const expiryDateObj = new Date(expiryDate);

    // 检查日期对象是否有效
    if (isNaN(manufactureDateObj.getTime()) || isNaN(expiryDateObj.getTime())) {
        throw new Error("Invalid date format");
    }
    // 比较日期
    return manufactureDateObj < expiryDateObj;
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
    checkDescription,
    checkDateFormat,
    checkDateValid,
    checkClass
 };