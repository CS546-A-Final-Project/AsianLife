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

// reviewsforproducts
console.log("-----------------------");
console.log("addreview");
const review1 = await reviewsforproductsData.addReview({
  user_id: "1",
  product_id: "1",
  review: "This is a review",
  rating: 5,
});
console.log("addreview");
const review2 = await reviewsforproductsData.addReview({
  user_id: "1",
  product_id: "2",
  review: "This is a review",
  rating: 5,
});

console.log("addreview");
const review3 = await reviewsforproductsData.addReview({
  user_id: "1",
  store_id: "1",
  review: "This is a review",
  rating: 5,
});

const getAllReviews = await reviewsforproductsData.getAllReviews();
console.log("getallreviews", getAllReviews);

const getReviewById = await reviewsforproductsData.getReviewById(
  review1._id.toString()
);
console.log("getReviewById", getReviewById);

const removeReview = await reviewsforproductsData.removeReview(
  review2._id.toString()
);
console.log("removeReview", removeReview);
const getAllReviews2 = await reviewsforproductsData.getAllReviews();
console.log(getAllReviews2);

const updateReview = await reviewsforproductsData.updateReview(
  review1._id.toString(),
  {
    user_id: "1",
    product_id: "1",
    review: "This is a updated review",
    rating: 1,
  }
);
const getReviewById2 = await reviewsforproductsData.getReviewById(
  review1._id.toString()
);
console.log("updateReview", getReviewById2);

console.log("-----------------------");

// reviewsforstores
console.log("-----------------------");
console.log("reviewsforstores");
console.log("addreview");
const review4 = await reviewsforstoresData.addReview({
  user_id: "1",
  store_id: "1",
  review: "This is a review",
  rating: 5,
});
console.log("addreview");
const review5 = await reviewsforstoresData.addReview({
  user_id: "1",
  store_id: "2",
  review: "This is a review",
  rating: 5,
});
console.log("addreview");
const review6 = await reviewsforstoresData.addReview({
  user_id: "1",
  store_id: "3",
  review: "This is a review",
  rating: 5,
});

const getAllReviews3 = await reviewsforstoresData.getAllReviews();
console.log("getallreviews", getAllReviews3);
const getReviewById3 = await reviewsforstoresData.getReviewById(
  review4._id.toString()
);
console.log("getReviewById", getReviewById3);
const removeReview2 = await reviewsforstoresData.removeReview(
  review5._id.toString()
);
console.log("removeReview", removeReview2);
const getAllReviews4 = await reviewsforstoresData.getAllReviews();
console.log(getAllReviews4);
const updateReview2 = await reviewsforstoresData.updateReview(
  review4._id.toString(),
  {
    user_id: "1",
    store_id: "1",
    review: "This is a updated review",
    rating: 1,
  }
);
const getReviewById4 = await reviewsforstoresData.getReviewById(
  review4._id.toString()
);
console.log("updateReview", updateReview2);
console.log(getReviewById4);
console.log("-----------------------");

// stores
console.log("-----------------------");
console.log("stores");
console.log("addstore");

const store1 = await storesData.addStore({
  admin_id: "1",
  photo_id: "1",
  category: "food",
  store_name: "store1",
  established_date: "2020-01-01",
  store_location: "New York",
  rating: 5,
  products: ["1", "2"],
  contact_information: "123-456-7890",
  comments: ["1", "2"],
  reviews: ["1", "2"],
});
console.log("addstore");
const store2 = await storesData.addStore({
  admin_id: "1",
  photo_id: "1",
  category: "food",
  store_name: "store2",
  established_date: "2020-01-01",
  store_location: "New York",
  rating: 5,
  products: ["1", "2"],
  contact_information: "123-456-7890",
  comments: ["1", "2"],
  reviews: ["1", "2"],
});
console.log("addstore");
const store3 = await storesData.addStore({
  admin_id: "1",
  photo_id: "1",
  category: "food",
  store_name: "store3",
  established_date: "2020-01-01",
  store_location: "New York",
  rating: 5,
  products: ["1", "2"],
  contact_information: "123-456-7890",
  comments: ["1", "2"],
  reviews: ["1", "2"],
});

const getAllStores1 = await storesData.getAllStores();
console.log("getallstores", getAllStores1);
const getStoreById = await storesData.getStoreById(store1._id.toString());
console.log("getStoreById", getStoreById);
const removeStore = await storesData.removeStore(store2._id.toString());
console.log("removeStore", removeStore);
const getAllStores2 = await storesData.getAllStores();
console.log(getAllStores2);

const updateStore = await storesData.updateStore(store1._id.toString(), {
    admin_id: "1",
    photo_id: "1",
    category: "food",
    store_name: "store1",
    established_date: "2020-01-01",
    store_location: "New York",
    rating: 5,
    products: ["1", "2"],
    contact_information: "123-456-7890",
    comments: ["1", "2","342"],
    reviews: ["1", "2"],
    });
console.log("updateStore", updateStore);
const getStoreById2 = await storesData.getStoreById(store1._id.toString());
console.log(getStoreById2);
console.log("done seeding db");

console.log("-----------------------");

// users
console.log("-----------------------");
console.log("users");
console.log("adduser");
const user1 = await usersData.addUser({
    first_name: "FF",
    last_name: "last",
    email: "1Q@gmail.com",
    gender: "Male",
    hash_password: "password",
    city: "city",
    state: "state",
    age: 20,
    users_reviews: ["1", "2"],
    users_comments: ["1", "2"],
    is_owner: true,
    owned_store_id: "1",
    });
console.log("adduser");
const user2 = await usersData.addUser({
    first_name: "FF",
    last_name: "last",
    email: "2Q@gmail.com",
    gender: "Female",
    hash_password: "password",
    city: "city",
    state: "state",
    age: 20,
    users_reviews: ["1", "2"],
    users_comments: ["1", "2"],
    is_owner: true,
    owned_store_id: "1",
    });
console.log("adduser");
const user3 = await usersData.addUser({
    first_name: "FF",
    last_name: "last",
    email: "adwad@gmail.com",
    gender: "Male",
    hash_password: "password",
    city: "city",
    state: "state",
    age: 20,
    users_reviews: ["1", "2"],
    users_comments: ["1", "2"],
    is_owner: true,
    owned_store_id: "1",
    });

const getAllUsers1 = await usersData.getAllUsers();
console.log("getallusers", getAllUsers1);
const getUser = await usersData.getUser(user1._id.toString());
console.log("getUser", getUser);
const removeUser = await usersData.removeUser(user2._id.toString());
console.log("removeUser", removeUser);
const getAllUsers2 = await usersData.getAllUsers();

const updateUser = await usersData.updateUser(user1._id.toString(), {
    first_name: "Updated!!!!!!!!!!",
    last_name: "last",
    email: "adwad@gmail.com",
    gender: "Male",
    hash_password: "password",
    city: "city",
    state: "state",
    age: 20,
    users_reviews: ["1", "2"],
    users_comments: ["1", "2"],
    is_owner: true,
    owned_store_id: "1",
    });
console.log("updateUser", updateUser);
const getUser2 = await usersData.getUser(user1._id.toString());
console.log(getUser2);
console.log(getAllUsers2);






await closeConnection();
