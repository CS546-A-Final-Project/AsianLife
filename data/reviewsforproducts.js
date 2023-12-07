import { reviewsforproducts } from "../config/mongoCollections.js";
import { products } from "../config/mongoCollections.js";
import validation from "../validation.js";
import { ObjectId } from "mongodb";

const getAllReviews = async () => {
    const reviewsCollection = await products();
    const reviews = await reviewsCollection.find({}).toArray();
    return reviews;
};
const getReviewById = async (id) => { // By review Id!!!
    id = helpers.checkId(id);
    const reviewsCollection = await reviewsforproducts();
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    if (!review) {
        throw new Error(`Review for ${id} not found`);
    }
    return review;
};
const addReview = async (
    user_id,
    product_id, // ObjectId
    store_id,
    productName, // string
    productReviews, // string
    rating
) => {
    user_id = helpers.checkId(user_id);
    product_id = helpers.checkId(product_id);
    store_id = helpers.checkId(store_id);
    productName = helpers.checkString(productName);
    productReviews = helpers.checkReview(productReviews);
    rating = helpers.checkRating(rating);
    let review = {
        _id: new ObjectId(),
        user_id: user_id, // user name
        product_id: product_id, // product name
        store_id: store_id, // store name
        productName: productName,
        productReviews: productReviews,
        rating: rating
    }
    const reviewsCollection = await reviewsforproducts();
    const newInsertInformation = await reviewsCollection.insertOne(review);
    const newId = newInsertInformation.insertedId;
    return await getReviewById(newId.toString());
};
const removeReview = async (id) => {
    id = helpers.checkId(id);
    const reviewsCollection = await reviewsforproducts();
    const deletionInfo = await reviewsCollection.findOneAndDelete({ _id: new ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete review with id of ${id}`;
    }
    //console.log(deletionInfo);
    return deletionInfo;
};
// const updateReview = async (
//     product_id,
//     productReview,
//     rating) => {

//     product_id = helpers.checkId(product_id);
//     productReview = helpers.checkReview(productReview);
//     rating = helpers.checkRating(rating);
//     // get collection
//     const reviewsCollection = await reviewsforproducts();
//     // find the review
//     //const product = await 
//     const updatedReviewData = reviewsCollection.findOne({_id: new ObjectId(product_id)});
//     // if (updatedReview.user_id) {
//     //     updatedReviewData.user_id = updatedReview.user_id;
//     // }

//     // if (updatedReview.product_id) {
//     //     updatedReviewData.product_id = updatedReview.product_id;
//     // }

//     if (updatedReview.review) {
//         updatedReviewData.review = updatedReview.review;
//     }

//     if (updatedReview.rating) {
//         updatedReviewData.rating = updatedReview.rating;
//     }

//     let updateCommand = {
//         $set: updatedReviewData,
//     };
//     const query = {
//         _id: new ObjectId(id),
//     };
//     await reviewsCollection.updateOne(query, updateCommand);
//     return await getReviewById(id.toString());
//};

export {
    getAllReviews,
    getReviewById,
    addReview,
    removeReview
    //updateReview,
};
