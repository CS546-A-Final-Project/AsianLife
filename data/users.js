import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const getUser = async (id) => {
  const usersCollection = await users();
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  if (!user) throw "User not found";
  return user;
}

const addUser = async (user) => {
  const usersCollection = await users();
  const newInsertInformation = await usersCollection.insertOne(user);
  const newId = newInsertInformation.insertedId;
  return await getUser(newId.toString());
}

const removeUser = async (id) => {
  const usersCollection = await users();
  const deletionInfo = await usersCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete user with id of ${id}`;
  }
  console.log(deletionInfo);
  return deletionInfo;
}

const updateUser = async (id, updatedUser) => {
  const usersCollection = await users();
  const updatedUserData = {};
  if (updatedUser.first_name) {
    updatedUserData.first_name = updatedUser.first_name;
  }
  if (updatedUser.last_name) {
    updatedUserData.last_name = updatedUser.last_name;
  }
  if (updatedUser.email) {
    updatedUserData.email = updatedUser.email;
  }
  if (updatedUser.gender) {
    updatedUserData.gender = updatedUser.gender;
  }
  if (updatedUser.hash_password) {
    updatedUserData.hash_password = updatedUser.hash_password;
  }
  if (updatedUser.city) {
    updatedUserData.city = updatedUser.city;
  }
  if (updatedUser.state) {
    updatedUserData.state = updatedUser.state;
  }
  if(updatedUser.age) {
    updatedUserData.age = updatedUser.age;
  }
  if (updatedUser.users_reviews) {
    updatedUserData.users_reviews = updatedUser.users_reviews;
  }
  if (updatedUser.users_comments) {
    updatedUserData.users_comments = updatedUser.users_comments;
  }
  if(updatedUser.is_owner) {
    updatedUserData.is_owner = updatedUser.is_owner;
  }
  if (updatedUser.owned_store_id) {
    updatedUserData.owned_store_id = updatedUser.owned_store_id;
  }
  let updateCommand = {
    $set: updatedUserData,
  };
  const query = {
    _id: new ObjectId(id),
  };
  await usersCollection.updateOne(query, updateCommand);
  return await getUser(id.toString());
}
const getAllUsers = async () => {
  const usersCollection = await users();
  const allUsers = await usersCollection.find({}).toArray();
  return allUsers;
}

export { getUser, addUser, removeUser, updateUser, getAllUsers};