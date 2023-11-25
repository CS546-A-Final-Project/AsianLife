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

console.log("done seeding db");

await closeConnection();
