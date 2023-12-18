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
let newUser1 = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'user1@m.com',
  'Abc123,,',
  'user'
);
let userId = newUser.user_id;
let userId1 = newUser1.user_id;
let newStoreId = await storesData.addStore({
  adminId: userId,
  name: '99 RANCH',
  address: "100 Jersey Ave",
  city: "Jersey City",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin1@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
let newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId1,
  store_id: newStoreId,
  comment: "This is comment1 for 99 RANCH"
});

let product = await productsData.addProduct(
  userId,
  newStoreId,
  'Cola Soda 24 pack',
  "Fresh Produce",
  7,
  '12/06/2023',
  '12/25/2023',
  100
)

let addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "Great soda!!!I love it!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Lay Chip family pack',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  20
)

addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "My favorite chip!!!!!!!!!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'A6 Steak Beef',
  "Fresh Produce",
  50,
  '12/06/2023',
  '12/25/2023',
  5
)

addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "The steak is really juicy!!!!!!!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Fresh Shrimp 5lb',
  "Fresh Produce",
  10,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Rao noodles sauce 1lb',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  10
)

addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "Great item!!!!!!!!!!!!!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Poland Water 24 pack',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Lettuce 1lb',
  "Fresh Produce",
  3,
  '12/06/2023',
  '12/25/2023',
  101
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  5
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
newUser1 = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'user2@m.com',
  'Abc123,,',
  'user'
);
userId1 = newUser1.user_id;
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'SHAXIANXIAOCHI',
  address: "241 Garden St",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "1234567890",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId1,
  store_id: newStoreId,
  comment: "This is comment1 for store1"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOGANMA2',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'LAOTAN2',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "bad!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'DOUBANJIANG2',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'MAPODOUFU2',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'YOULEMEI2',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Cabbage',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "I will go back to shop next time!!!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Sunkist',
  "Fresh Produce",
  2,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "That's the favorite soda of my girlfriend!",
  5
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
newUser1 = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'user3@m.com',
  'Abc123,,',
  'user'
);
userId1 = newUser1.user_id;
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'ACME',
  address: "100 Clinton",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "5879567853",
  email: "admin2@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId1,
  store_id: newStoreId,
  comment: "This is comment1 for ACME"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Whole Milk',
  "Fresh Produce",
  3.69,
  '12/06/2023',
  '12/25/2023',
  200
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Lay Chip',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  100
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "I hate that chips, make me thirsty!!!!!!!!!",
  1
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Ice Cream',
  "Fresh Produce",
  10,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "Great Deal!!!!Everythings great here!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Poland Water 24 pack',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  50
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "It's goooooooooooooooooooooooooood?",
  3
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Black Pepper Sauce',
  "Fresh Produce",
  3,
  '12/06/2023',
  '12/25/2023',
  200
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "That's great. I must add it to my steak!!!!!!!!EVERYTIME!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'RAO sauce',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "Bad!!!!!!!!!!!!!!!TOO sour!!!!!!!!!!!!",
  1
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'White Pepper',
  "Fresh Produce",
  1,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "I need it everytime when I cook!!!!!!!!!!!!!!",
  5
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
newUser1 = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'user4@m.com',
  'Abc123,,',
  'user'
);
userId1 = newUser1.user_id;
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'Shoprite',
  address: "100 Madison St",
  city: "Hoboken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "6385960782",
  email: "admin4@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId1,
  store_id: newStoreId,
  comment: "This is comment1 for Shoprite"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Cola Soda 12 pack',
  "Fresh Produce",
  5,
  '12/06/2023',
  '12/25/2023',
  200
)

addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Top loin beef',
  "Fresh Produce",
  10,
  '12/06/2023',
  '12/25/2023',
  20
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "That's juicy!!!!!!!!!!!!!!!!!!!!!",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Long Grain Rice 20 lb',
  "Fresh Produce",
  9.9,
  '12/06/2023',
  '12/25/2023',
  10
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "Best rice I've eat!!!!!!!!!!!!!!!!!!!!",
  5
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'vitafusion',
  "Fresh Produce",
  8.9,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Bread',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'New Yorker Beef',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'New York House Beef',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
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
newUser1 = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'user5@m.com',
  'Abc123,,',
  'user'
);
userId1 = newUser1.user_id;
userId = newUser.user_id;
newStoreId = await storesData.addStore({
  adminId: userId,
  name: 'Whole food',
  address: "Harbor BLVD",
  city: "Weehawken",
  state: "NJ",
  zipCode: "07030",
  phoneNumber: "3568906435",
  email: "admin5@m.com",
});
await usersData.bindStoreWithUser(newStoreId, userId);
newComment1forstore = await commentsforstoresData.addComment({
  user_id: userId1,
  store_id: newStoreId,
  comment: "This is comment1 for Whole food"
});

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Mango Sunkist Soda',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)

addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Grape Sunkist Soda',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'HD Ice Cream',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Unsticky Pot',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Kitchen Gloves',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  5
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Steak Beef',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)

product = await productsData.addProduct(
  userId,
  newStoreId,
  'Vitafusion',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023',
  1
)
addReview = await reviewsforproductsData.addReview(
  userId1,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
await closeConnection();