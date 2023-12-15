import { stores } from "../config/mongoCollections.js";
import * as storeFunctions from '../data/stores.js';
import { products } from "../config/mongoCollections.js";
import * as productsFunctions from './products.js';
import * as usersFunctions from '../data/users.js';
import { ObjectId } from "mongodb";
import xss from "xss";
import helpers from '../helpers.js';


const getAllReviews = async (product_id) => { // get all reviews for one product
    product_id = xss(product_id);
    product_id = helpers.checkId(product_id, 'product_id');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ _id: new ObjectId(product_id) });
    console.log(product);
    if (!product) {
        throw new Error(`Product with id ${product_id} has not been found.`)
    }

    if (product.productReviews && product.productReviews.length > 0) {
        for (let review of product.productReviews) {
            review._id = review._id.toString();
        }
        //     reviews = await product.productReviews.map(reveiw => {
        //             user_id: getUserNamebyUserId(user_id), // user name
        //             product_id: product_id, // product name
        //             storeName: getStoreNameByStoreId(product.store_id); // get store id from product directly
        //             productName: product.productName,
        //             productReviews: productReviews,
        //             rating: rating
        //     })

    }
    return product.productReviews;
};
const getUserNamebyUserId = async (user_id) => {
    user_id = xss(user_id);
    user_id = helpers.checkId(user_id, 'user_id');
    let user = await usersFunctions.getUser(user_id);
    return user.userName;
}
const getStoreNameByStoreId = async (store_id) => {
    store_id = xss(store_id);
    store_id = helpers.checkId(store_id, 'store_id');
    let store = await storeFunctions.getStoreById(store_id);
    return store.name;
}
// const getReviewByUserId = async (id, product_id) => { // By review Id!!!
//     id = xss(id);
//     id = helpers.checkId(id, "product_id");
//     const productsCollection = await products();
//     const product = await productsCollection.findOne({ _id: new ObjectId(id) });
//     if (!product) {
//         throw new Error(`Product for _id ${id} dost not found`);
//     }
//     const reviewInfo;
//     for(let review of product.productReviews) {
//         if (review._id = ) {

//         }
//     }
//     return review;
// };
const addReview = async (
    user_id,
    product_id, // ObjectId
    store_id, // 可以不添加store id，
    productReviews, // string
    rating
) => {
    user_id = helpers.checkId(user_id, 'user_id');
    product_id = helpers.checkId(product_id, 'product_id');
    store_id = helpers.checkId(store_id, 'store_id');
    productReviews = helpers.checkReview(productReviews, 'productReviews');
    rating = helpers.checkRating(rating, ' rating');
    const productsCollection = await products();
    const product = await productsFunctions.getProductById(product_id);
    const storeCollection = await stores();
    const store = await storeFunctions.getStoreById(store_id);

    let review = {
        _id: new ObjectId(),
        user_id: user_id, // user name
        store_id: store_id, // get store id from product directly
        product_id: product_id, // get product name by product_Id?
        productName: product.productName,
        productReviews: productReviews,
        rating: rating
    }
    // check if the review has been already existed
    if (product.productReviews.length > 0) {
        for (let review of product.productReviews) {
            if (
                user_id === review.user_id &&
                product_id === review.product_id &&
                productReviews === review.productReviews &&
                rating === review.rating
            ) {
                throw new Error(`This review ${review} has been already existed!`)
            }
        }
    }

    let totalAmountOfReviews = product.totalAmountOfReviews + 1;
    let productRating = (rating + product.productRating * product.totalAmountOfReviews) / totalAmountOfReviews
    const newInsertProductInformation = await productsCollection.updateOne(
        { _id: new ObjectId(product_id) },
        {
            $push: { productReviews: review }, // add value to array[]
            $inc: { totalAmountOfReviews: 1 }, // increment or decrement value
            $set: { productRating: productRating }

        }
    );
    if (newInsertProductInformation.modifiedCount === 0) {
        throw new Error("No document was updated in Product Collection. Review might already exist.");
    }


    // 初始化总评分为0
    let totalRating = 0;
    // 遍历所有产品ID
    for (const productId of store.products) {
        // 获取每个产品的详细信息
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
        totalRating += product.productRating;
    }
    // 计算平均评分
    let storeRating = totalRating / store.products.length;

    const newInsertStoreInformation = await storeCollection.updateOne(
        { _id: new ObjectId(store_id) },
        { $set: { rating: storeRating } }
    );

    if (!newInsertStoreInformation) {
        throw new Error("No document was updated in Store Collection.");
    }
    review._id = review._id.toString();

    return review;
};
const removeReview = async (id) => {
    id = xss(id);
    id = helpers.checkId(id, 'review_id');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ "productReviews._id": new ObjectId(id) });
    // console.log(product);
    if (!product) throw new Error(`Cannot find a product with the review id ${id}.`);

    // 找到并移除对应的评论
    let reviewToRemove;
    const updatedReview = product.productReviews.filter(
        (review) => {
            if (review._id.toString() === id) {
                reviewToRemove = review;
                return false;
            }
            return true;
        }
    );

    if (!reviewToRemove) {
        throw new Error(`Review with id ${id} not found in product.`);
    }

    // 重新计算产品评分
    let totalRating = product.productRating * product.totalAmountOfReviews;
    totalRating -= reviewToRemove.rating; // 减去被删除评论的评分
    const productRating = product.totalAmountOfReviews > 1
        ? totalRating / (product.totalAmountOfReviews - 1)
        : 0;

    const updatedInfo = await productsCollection.updateOne(
        { _id: product._id },
        {
            $inc: { totalAmountOfReviews: -1 },
            $set: {
                productReviews: updatedReview,
                productRating: productRating
            }
        }
    );
    //console.log(updatedInfo);
    return updatedInfo;
};


const updateReview = async (
    user_id, // must
    review_id, // must
    productReview,
    rating) => {
    // user_id = helpers.checkId(user_id, 'user_id');
    review_id = helpers.checkId(review_id, 'review_id');

    const productsCollection = await products();
    const product = await productsCollection.findOne({ "productReviews._id": new ObjectId(review_id) });
    //console.log(product);
    if (!product) throw new Error(`Cannot find a product with the review id ${review_id}.`);

    let updatedReview;
    let reviewFound = false;
    product.productReviews.forEach((review) => {
        if (review._id.toString() === review_id) {
            if (productReview) {
                review.productReviews = helpers.checkReview(productReview, 'productReview');
            }
            if (rating) {
                review.rating = helpers.checkRating(rating, 'rating');
            }
            updatedReview = review
            reviewFound = true;
        }
    });

    if (!reviewFound) {
        throw new Error(`Review with id ${review_id} not found.`);
    }

    // 重新计算产品评分
    let totalRating = product.productReviews.reduce((sum, review) => sum + review.rating, 0);
    let productRating = totalRating / product.productReviews.length;

    // 更新产品信息
    const query = { _id: product._id };
    const updateCommand = {
        $set: {
            productReviews: product.productReviews,
            productRating: productRating
        }
    };

    await productsCollection.updateOne(query, updateCommand);
    return updatedReview;
};


export {
    getAllReviews,
    // getReviewById,
    addReview,
    removeReview,
    updateReview,
};
