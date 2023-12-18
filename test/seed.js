import {
  reviewsforproductsData,
  reviewsforstoresData,
  storesData,
  usersData,
  commentsData,
  productsData,
  commentsforstoresData
} from "../data/index.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import helpers from "../helpers.js";

const db = await dbConnection();
await db.dropDatabase();

//--------------------admin1-----------------------
let newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'admin1@m.com',
  'Abc123,,',
  'admin'
);
let userId = newUser.user_id;
let newStoreId = await storesData.addStore({
  adminId: userId,
  name: '99 RANCH',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin1@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
let newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

let product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

let addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "gooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

//--------------------admin2-----------------------
newUser = await usersData.addUser(
  'FANGSIYUAN',
  'Siyuan',
  'Fang',
  'admin2@m.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'SHAXIANXIAOCHI',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
//--------------------admin3-----------------------
newUser = await usersData.addUser(
  'LUOYAXI',
  'Yaxi',
  'Luo',
  'admin3@m.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'GOUBULIBAOZI',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
//--------------------admin4-----------------------
newUser = await usersData.addUser(
  'JIAJUNWU',
  'Jiajun',
  'Wu',
  'admin4@m.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'XIAOMAIBU',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
//--------------------admin5-----------------------
newUser = await usersData.addUser(
  'SUZHANG',
  'Su',
  'Zhang',
  'admin5@m.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'HUAIJIUSHIPIN',
  address: "address",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
await closeConnection();