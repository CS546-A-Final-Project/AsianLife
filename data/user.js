import { users } from "../config/mongoCollections";
import { ObjectId } from "mongodb";

const addUser = async (object) => {
    let userName = object.userName;
    let firstName = object.firstName;
    let lastName = object.lastName;
    let email = object.email;
    let password = object.password;
    let isAdmin = object.isAdmin == 'on' ? true : false;
    let newUser = {
        "userName": userName,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "hashPassword": password,
        "gender": "",
        "age": -1,
        "userReviews": [],
        "userComments": [],
        "isAdmin": isAdmin,
        "ownedStoreId": "",
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not creat event';

    const newUserId = insertInfo.insertedId.toString();
    const theUser = await getUser(newUserId);
    return theUser;
};

const getUser = async (id) => {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const userCollection = await users();
    const theUser = await userCollection.findOne({ _id: new ObjectId(id) });
    if (theUser === null) throw 'No event with that id';
    return theUser;
  };

export { addUser, getUser };