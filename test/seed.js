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
let user1Id = newUser.newUserId;
await addStore({
  adminId: user1Id,
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc1@gmail.com",
});

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc2@gmail.com',
  'Abc123,,',
  'admin'
);
let user2Id = newUser.newUserId;
await addStore({
  adminId: user2Id,
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "abc1@gmail.com",
});

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc3@gmail.com',
  'Abc123,,',
  'admin'
);
let user3Id = newUser.newUserId;
console.log(newUser);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc4@gmail.com',
  'Abc123,,',
  'admin'
);
let user4Id = newUser.newUserId;
console.log(newUser);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc5@gmail.com',
  'Abc123,,',
  'admin'
);
let user5Id = newUser.newUserId;
console.log(newUser);
await closeConnection();
