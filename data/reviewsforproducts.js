import { reviewsforproducts } from "../config/mongoCollections.js";
import helpers from "../helpers.js";
import { ObjectId } from "mongodb";

const getAllReviews = async () => {
    const reviewsCollection = await reviewsforproducts();
    const reviews = await reviewsCollection.find({}).toArray();
    return reviews;
};
const getReviewById = async (id) => { // By Product Id!!!
    id = helpers.checkId(id);
    const reviewsCollection = await reviewsforproducts();
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    if (!review) {
        throw new Error(`Review for ${id} not found`);
    }
    return review;
};
const addReview = async (
    product_id, // ObjectId
    productName, // string
    productReviews, // string
    rating
) => {
    product_id = helpers.checkId(product_id);
    productName = helpers.checkString(productName);
    productReviews = helpers.checkReview(productReviews);
    rating = helpers.checkRating(rating);
    let review = {
        product_id: new ObjectId(),
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
const updateReview = async (
    id, 
    productReviews,
    rating) => {

    id = helpers.checkId(id);
    productReviews = helpers.checkReview(productReviews);
    rating = helpers.checkRating(rating);
    
    const reviewsCollection = await reviewsforproducts();
    const updatedReviewData = {};
    if (updatedReview.user_id) {
        updatedReviewData.user_id = updatedReview.user_id;
    }

    if (updatedReview.product_id) {
        updatedReviewData.product_id = updatedReview.product_id;
    }

    if (updatedReview.review) {
        updatedReviewData.review = updatedReview.review;
    }

    if (updatedReview.rating) {
        updatedReviewData.rating = updatedReview.rating;
    }

    let updateCommand = {
        $set: updatedReviewData,
    };
    const query = {
        _id: new ObjectId(id),
    };
    await reviewsCollection.updateOne(query, updateCommand);
    return await getReviewById(id.toString());
};

export {
    getAllReviews,
    getReviewById,
    addReview,
    removeReview,
    updateReview,
};
