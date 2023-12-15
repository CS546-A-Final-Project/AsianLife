import {
  reviewsforproductsData,
  reviewsforstoresData,
  storesData,
  usersData,
  commentsData,
  productsData,
} from "../data/index.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

let newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc1@gmail.com',
  'Abc123,,',
  'admin'
);
let userId = newUser.newUserId.toString();
let newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'store1',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc1@gmail.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc2@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.newUserId.toString();
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'store2',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc2@gmail.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc3@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.newUserId.toString();
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'store3',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc3@gmail.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc4@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.newUserId.toString();
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'store4',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc4@gmail.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc5@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.newUserId.toString();
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'store5',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc5@gmail.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
await closeConnection();
