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

//--------------------admin1-----------------------
let newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc1@gmail.com',
  'Abc123,,',
  'admin'
);
let userId = newUser.user_id;
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

let product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
let addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooooood",
  4
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "gooooooooooooooooooooooooooooooooood",
  4
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooooood",
  4
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooooood",
  4
)
addReview = await reviewsforproductsData.addReview(
  userId,
  product,
  newStoreId,
  "goooooooooooooooooooooooooooood",
  4
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'AAAAA',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)

//--------------------admin2-----------------------
newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc2@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
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
product = await productsData.addProduct(
  userId,
  newStoreId,
  'BBB',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'BBBB',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'BBBBB',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)

//--------------------admin3-----------------------
newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc3@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
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
product = await productsData.addProduct(
  userId,
  newStoreId,
  'CCC',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'CCCC',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'CCCCC',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
//--------------------admin4-----------------------
newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc4@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
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
product = await productsData.addProduct(
  userId,
  newStoreId,
  'DDD',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'DDDD',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'DDDDD',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
//--------------------admin5-----------------------
newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc5@gmail.com',
  'Abc123,,',
  'admin'
);
userId = newUser.user_id;
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
product = await productsData.addProduct(
  userId,
  newStoreId,
  'EEE',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'EEEE',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
product = await productsData.addProduct(
  userId,
  newStoreId,
  'EEEEE',
  "Fresh Produce",
  13,
  '12/06/2023',
  '12/25/2023'
)
await closeConnection();
// // reviewsforproducts
// console.log("-----------------------");
// console.log("addreview");
// const review1 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "1",
//   review: "This is a review",
//   rating: 5,
// });
// console.log("addreview");
// const review2 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "2",
//   review: "This is a review",
//   rating: 5,
// });

// console.log("addreview");
// const review3 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   store_id: "1",
//   review: "This is a review",
//   rating: 5,
// });

// const getAllReviews = await reviewsforproductsData.getAllReviews();
// console.log("getallreviews", getAllReviews);

// const getReviewById = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("getReviewById", getReviewById);

// const removeReview = await reviewsforproductsData.removeReview(
//   review2._id.toString()
// );
// console.log("removeReview", removeReview);
// const getAllReviews2 = await reviewsforproductsData.getAllReviews();
// console.log(getAllReviews2);

// const updateReview = await reviewsforproductsData.updateReview(
//   review1._id.toString(),
//   {
//     user_id: "1",
//     product_id: "1",
//     review: "This is a updated review",
//     rating: 1,
//   }
// );
// const getReviewById2 = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("updateReview", getReviewById2);

// console.log("-----------------------");

// // commentsforstores
// console.log("-----------------------");
// console.log("commentsforstores");
// console.log("addcomment");
// const storecomment1 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657a7edec01752ef4db69b36",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// }); 
// console.log(storecomment1)
// console.log("addcomment");
// const storecomment2 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657b24d2bd1b4f1cadcc4b25",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// });
// console.log("addcomment");
// const storecomment3 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657b24d2bd1b4f1cadcc4b25",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// });

// const getAllcomment1 = await commentsforstoresData.getAllComments("1");
// console.log("getallcommentsforstoreid1", getAllcomment1 );
// const getCommentById11 = await commentsforstoresData.getCommentById(
//   storecomment1._id.toString()
// );
// console.log("getCommentById", getCommentById11);
// const removeComment1 = await commentsforstoresData.removeComment(
//   storecomment2._id.toString()
// );
// console.log("removeComment", removeComment1);
// const getAllcomment2 = await commentsforstoresData.getAllComments("2");
// console.log(getAllcomment2);
// const addAnswer1 = await commentsforstoresData.addAnswer(
//   storecomment1._id.toString(), "This is answer for comment"
// );
// console.log("addAnswer", addAnswer1)
// const addAnswer2 = await commentsforstoresData.addAnswer(
//   storecomment3._id.toString(), "This is answer for comment"
// );
// console.log("addanswer", addAnswer2);
// const getAnswer = await commentsforstoresData.getAnswerById(
//   storecomment1._id.toString()
// );
// console.log("getAnswer",getAnswer);
// const deleteAnswer = await commentsforstoresData.deleteAnswer(
//   storecomment1._id.toString()
// );

// console.log("deleteAnswer", deleteAnswer);
// console.log("-----------------------");

// // stores
// console.log("-----------------------");
// console.log("stores");
// console.log("addstore");

// const store1 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store1",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store2 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store2",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store3 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store3",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });

// const getAllStores1 = await storesData.getAllStores();
// console.log("getallstores", getAllStores1);
// const getStoreById = await storesData.getStoreById(store1._id.toString());
// console.log("getStoreById", getStoreById);
// const removeStore = await storesData.removeStore(store2._id.toString());
// console.log("removeStore", removeStore);
// const getAllStores2 = await storesData.getAllStores();
// console.log(getAllStores2);

// const updateStore = await storesData.updateStore(store1._id.toString(), {
//     admin_id: "1",
//     photo_id: "1",
//     category: "food",
//     store_name: "store1",
//     established_date: "2020-01-01",
//     store_location: "New York",
//     rating: 5,
//     products: ["1", "2"],
//     contact_information: "123-456-7890",
//     comments: ["1", "2","342"],
//     reviews: ["1", "2"],
//     });
// console.log("updateStore", updateStore);
// const getStoreById2 = await storesData.getStoreById(store1._id.toString());
// console.log(getStoreById2);
// console.log("done seeding db");

// console.log("-----------------------");

// // users
// console.log("-----------------------");
// console.log("users");
// console.log("adduser");
// const user1 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "1Q@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user2 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "2Q@gmail.com",
//     gender: "Female",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user3 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });

// const getAllUsers1 = await usersData.getAllUsers();
// console.log("getallusers", getAllUsers1);
// const getUser = await usersData.getUser(user1._id.toString());
// console.log("getUser", getUser);
// const removeUser = await usersData.removeUser(user2._id.toString());
// console.log("removeUser", removeUser);
// const getAllUsers2 = await usersData.getAllUsers();

// const updateUser = await usersData.updateUser(user1._id.toString(), {
//     first_name: "Updated!!!!!!!!!!",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("updateUser", updateUser);
// const getUser2 = await usersData.getUser(user1._id.toString());
// console.log(getUser2);
// console.log(getAllUsers2);


// console.log("-----------------------");

// // comments
// console.log("-----------------------");
// console.log("comments");
// console.log("addcomment");
// const comment1 = await commentsData.addComment({
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment2 = await commentsData.addComment({
//     user_id: "2",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment3 = await commentsData.addComment({
//     user_id: "3",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });

// const getAllComments1 = await commentsData.getAllComments();
// console.log("getallcomments", getAllComments1);
// const getCommentById1 = await commentsData.getCommentById(comment1._id.toString());
// console.log("getCommentById", getCommentById1);
// const removeComment = await commentsData.removeComment(comment2._id.toString());
// console.log("removeComment", removeComment);
// const getAllComments2 = await commentsData.getAllComments();
// console.log(getAllComments2);

// const updateComment = await commentsData.updateComment(comment1._id.toString(), {
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a updated comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("updateComment", updateComment);
// const getCommentById2 = await commentsData.getCommentById(comment1._id.toString());
// console.log(getCommentById2);
// console.log("-----------------------");

// // products

// console.log("-----------------------");
// console.log("products");
// console.log("addproduct");
// const product1 = await productsData.addProduct({
//     product_name: "product1",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("addproduct");
// const product2 = await productsData.addProduct({
//     product_name: "product2",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("addproduct");
// const product3 = await productsData.addProduct({
//     product_name: "product3",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
    
// const getAllProducts1 = await productsData.getAllProducts();
// console.log("getallproducts", getAllProducts1);
// const getProductById1 = await productsData.getProductById(product1._id.toString());
// console.log("getProductById", getProductById1);
// const removeProduct = await productsData.removeProduct(product2._id.toString());
// console.log("removeProduct", removeProduct);
// const getAllProducts2 = await productsData.getAllProducts();
// console.log(getAllProducts2);

// const updateProduct = await productsData.updateProduct(product1._id.toString(), {
//     product_name: "update !!!!!!product1",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("updateProduct", updateProduct);
// const getProductById2 = await productsData.getProductById(product1._id.toString());
// console.log(getProductById2);




// await closeConnection();
