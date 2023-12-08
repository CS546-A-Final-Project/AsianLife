import { reviewsforproducts } from "../config/mongoCollections.js";
import { products } from "../config/mongoCollections.js";
import * as productsFunctions from './products.js';
import validation from "../validation.js";
import { ObjectId } from "mongodb";
import xss from "xss";
import helpers from '../helpers.js';

const getAllReviews = async () => {
    const productsCollection = await products();
    const reviews = await productsCollection.find({}).toArray();
    return reviews;
};
const getReviewById = async (id) => { // By review Id!!!
    id = xss(id);
    id = helpers.checkId(id);
    const productsCollection = await products();
    const review = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!review) {
        throw new Error(`Review for ${id} not found`);
    }
    return review;
};
const addReview = async (
    user_id,
    product_id, // ObjectId
    //store_id,
    //productName, // string
    productReviews, // string
    rating
) => {
    //user_id = helpers.checkId(user_id);
    product_id = helpers.checkId(product_id);
    //store_id = helpers.checkId(store_id);
    //productName = helpers.checkString(productName);
    productReviews = helpers.checkReview(productReviews);
    rating = helpers.checkRating(rating);
    const productsCollection = await products();
    const product = await productsFunctions.getProductById(product_id);
    
    let review = {
        _id: new ObjectId(),
        user_id: user_id, // user name
        product_id: product_id, // product name
        store_id: product.store_id, // get store id from product directly
        productName: product.productName,
        productReviews: productReviews,
        rating: rating
    }

    let totalAmountOfComments = product.totalAmountOfComments + 1;
    let productRating = (product.productRating + rating) / totalAmountOfComments
  
    const newInsertInformation = await productsCollection.updateOne(
        { _id: new ObjectId(product_id)},
        { 
            $push: { productReviews: review },
            $inc:{ totalAmountOfComments: 1 },
            $set: { productRating: (product.productRating * product.totalAmountOfComments + rating)/(product.totalAmountOfComments + 1)}
                  
        }
    );
    const newId = newInsertInformation._id;
    console.log(newId)
   // return await getReviewById(newId.toString());
};
const removeReview = async (id) => {
    id = xss(id);
    id = helpers.checkId(id);
    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({ _id: new ObjectId(id) });
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
