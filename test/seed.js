import {reviewsforproductsData, reviewsforstoresData, storesData, usersData, commentsData, productsData} from '../data/index.js';
import { dbConnection, closeConnection } from '../config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

// reviewsforproducts
console.log('-----------------------');
console.log('addreview');
const review1 = await reviewsforproductsData.addReview({
    user_id: "1",
    product_id: "1",
    review: "This is a review",
    rating: 5
});
console.log('addreview');
const review2 = await reviewsforproductsData.addReview({
    user_id: "1",
    product_id: "2",
    review: "This is a review",
    rating: 5
});

console.log('addreview');
const review3 = await reviewsforproductsData.addReview({
    user_id: "1",
    store_id: "1",
    review: "This is a review",
    rating: 5
});

const getAllReviews = await reviewsforproductsData.getAllReviews();
console.log('getallreviews',getAllReviews);

const getReviewById = await reviewsforproductsData.getReviewById(review1._id.toString());
console.log('getReviewById', getReviewById);

const removeReview = await reviewsforproductsData.removeReview(review2._id.toString());
console.log('removeReview', removeReview);
const getAllReviews2 = await reviewsforproductsData.getAllReviews();
console.log(getAllReviews2);

const updateReview = await reviewsforproductsData.updateReview(review1._id.toString(), {
    user_id: "1",
    product_id: "1",
    review: "This is a updated review",
    rating: 1
});
const getReviewById2 = await reviewsforproductsData.getReviewById(review1._id.toString());
console.log('updateReview', getReviewById2);

console.log('-----------------------');
console.log('done seeding db');

await closeConnection();