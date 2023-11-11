import { createRequire } from 'module';
import { users } from "./config/mongoCollections.js";
import { ObjectId } from "mongodb";

const toHashPassword = (password) => {
        const require = createRequire(import.meta.url);
        var passwordHash = require('password-hash');
        var hashedPassword = passwordHash.generate(password);
        return hashedPassword;
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

const checkIfPasswordCorrect = async (email, password) => {
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === email) {
            const require = createRequire(import.meta.url);
            var passwordHash = require('password-hash');
            return passwordHash.verify(password, user.hashPassword);
        }
    }
}

const getUserIdByEmail = async (email) => {
    const userCollection = await users();
    const userList = await userCollection.find().toArray();
    for (let user of userList) {
        if (user.email === email) {
            return user._id.toString();
        }
    }
}

export default {toHashPassword, checkIfEmailExists, checkIfPasswordCorrect, getUserIdByEmail};