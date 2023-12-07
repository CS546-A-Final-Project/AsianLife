import { stores } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
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
  const storesCollection = await stores();
  const newInsertInformation = await storesCollection.insertOne(store);
  const newId = newInsertInformation.insertedId;
  return await getStoreById(newId.toString());
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
  const storesCollection = await stores();
  const updatedStoreData = {};
  if (updatedStore.admin_id) {
    updatedStoreData.admin_id = updatedStore.admin_id;
  }
  if (updatedStore.photo) {
    updatedStoreData.photo = updatedStore.photo;
  }
  if (updatedStore.category) {
    updatedStoreData.category = updatedStore.category;
  }
  if (updatedStore.established_date) {
    updatedStoreData.established_date = updatedStore.established_date;
  }
  if (updatedStore.store_location) {
    updatedStoreData.store_location = updatedStore.store_location;
  }
  if (updatedStore.store_name) {
    updatedStoreData.store_name = updatedStore.store_name;
  }
  if (updatedStore.rating) {
    updatedStoreData.rating = updatedStore.rating;
  }
  if (updatedStore.products) {
    updatedStoreData.products = updatedStore.products;
  }
  if (updatedStore.contact_information) {
    updatedStoreData.contact_information = updatedStore.contact_information;
  }
  if (updatedStore.comments) {
    updatedStoreData.comments = updatedStore.comments;
  }
  if (updatedStore.reviews) {
    updatedStoreData.reviews = updatedStore.reviews;
  }
  let updateCommand = {
    $set: updatedStoreData,
  };

  const query = {
    _id: new ObjectId(id),
  };
  await storesCollection.updateOne(query, updateCommand);
  return await getStoreById(id.toString());
};

const updateImage = async (id, updatedStore) => {
  const storesCollection = await stores();
  await storesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        photo: updatedStore.photo,
      },
    },
    { returnDocument: "after" }
  );
}

export { getAllStores, getStoreById, addStore, removeStore, updateStore, updateImage};
