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



export default { toHashPassword, checkIfEmailExists, checkIfEmailExistsExceptMe, checkIfPasswordCorrect, getUserInfoByEmail };