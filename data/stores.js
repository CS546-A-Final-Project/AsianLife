import { stores } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getUser } from "./users.js";
import xss from "xss";
import validation from "../validation.js";

const getAllStores = async () => {
  const storesCollection = await stores();
  const allStores = await storesCollection.find({}).toArray();
  return allStores;
};
const getStoreById = async (id) => {
  const storesCollection = await stores();
  const store = await storesCollection.findOne({ _id: new ObjectId(id) });
  if (!store) throw "Store not found";
  return store;
};
const addStore = async (store) => {
  let adminId = xss(store.adminId).trim();
  let address = xss(store.address).trim();
  let city = xss(store.city).trim();
  let state = xss(store.state).trim();
  let zipCode = xss(store.zipCode).trim();
  let phoneNumber = xss(store.phoneNumber).trim();
  let email = xss(store.email).trim().toLowerCase();
  const location = {
    address: address,
    city: city,
    state: state,
    zip: zipCode,
  }
  const admin = await getUser(adminId);
  if (admin.role !== "admin") {
    throw "The user don't have authorization to add a store";
  }
  try {
    validation.checkIfLocationValid(location);
    validation.checkIfPhoneNumberValid(phoneNumber);
    validation.checkEmail(email, 'E-mail');
  } catch (e) {
    throw e;
  }
  const currentTime = new Date().toUTCString()
  const newStore = {
    admin_id: adminId,
    photo_id: "default.jpg",
    established_date: currentTime,
    store_location: {
      streetAddress: address,
      city: city,
      state: state,
      zip: zipCode,
    },
    rating: 0,
    products: [],
    contact_information: {
      phone: phoneNumber,
      email: email,
    },
    reviews:{},
  }
  const storesCollection = await stores();
  const newInsertInformation = await storesCollection.insertOne(newStore);
  const newId = newInsertInformation.insertedId;
  return newId.toString();
};
const removeStore = async (id) => {
  const storesCollection = await stores();
  const deletionInfo = await storesCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete store with id of ${id}`;
  }
  console.log(deletionInfo);
  return deletionInfo;
};
const updateStore = async (id, updatedStore) => {
  let adminId = xss(updatedStore.adminId).trim();
  let name = xss(updatedStore.name).trim();
  let address = xss(updatedStore.address).trim();
  let city = xss(updatedStore.city).trim();
  let state = xss(updatedStore.state).trim();
  let zipCode = xss(updatedStore.zipCode).trim();
  let phoneNumber = xss(updatedStore.phoneNumber).trim();
  let email = xss(updatedStore.email).trim().toLowerCase();
  const location = {
    address: address,
    city: city,
    state: state,
    zip: zipCode,
  }
  const admin = await getUser(adminId);
  console.log(admin);
  if (admin.role !== "admin") {
    throw "The user don't have authorization to add a store";
  }
  try {
    validation.checkIfLocationValid(location);
    validation.checkIfPhoneNumberValid(phoneNumber);
    validation.checkEmail(email, 'E-mail');
    validation.checkIfStoreNameValid(name);
  } catch (e) {
    throw e;
  }
  const updateStoreData = {
    name: name,
    store_location: {
      streetAddress: address,
      city: city,
      state: state,
      zip: zipCode,
    },
    contact_information: {
      phone: phoneNumber,
      email: email,
    },
    reviews: {},
  }
  const storesCollection = await stores();
 
  let updateCommand = {
    $set: updateStoreData,
  };

  const query = {
    _id: new ObjectId(id),
  };
  await storesCollection.updateOne(query, updateCommand);
  console.log("update store");
  return await getStoreById(id.toString());
};

const updateImage = async (id, photo_id) => {
  const storesCollection = await stores();
  await storesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        photo_id: photo_id,
      },
    },
    { returnDocument: "after" }
  );
}

export { getAllStores, getStoreById, addStore, removeStore, updateStore, updateImage};
