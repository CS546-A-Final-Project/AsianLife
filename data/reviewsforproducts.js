import { stores } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import * as storeFunctions from '../data/stores.js';
import { products } from "../config/mongoCollections.js";
import * as productsFunctions from './products.js';
import * as usersFunctions from '../data/users.js';
import { ObjectId } from "mongodb";
import xss from "xss";
import helpers from '../helpers.js';


const getAllReviews = async (product_id) => {
    product_id = xss(product_id);
    product_id = helpers.checkId(product_id, 'product_id');
    const productsCollection = await products();

    const product = await productsCollection.findOne({ _id: new ObjectId(product_id) });
    if (!product) {
        throw (`Product with id ${product_id} has not been found.`);
    }
    console.log("product" + product);
    console.log("product.productReviews" + product.productReviews);
    return product.productReviews || [];
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
// const getReviewByReviewId = async (user_id, product_id) => { // By review Id!!!
//     user_id = xss(user_id);
//     user_id = helpers.checkId(user_id, "user_id");
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
    const usersCollection = await users();
    const productsCollection = await products();
    const product = await productsFunctions.getProductById(product_id);
    const storeCollection = await stores();
    const store = await storeFunctions.getStoreById(store_id);

    let review = {
        _id: new ObjectId(),
        user_id: user_id, // user name
        product_id: product_id, // get product name by product_Id?
        store_id: store_id, // get store id from product directly
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
                store_id === review.store_id &&
                productReviews === review.productReviews &&
                rating === review.rating
            ) {
                throw (`This review ${review} has been already existed!`)
            }
        }
    };

    const updateUser = await usersCollection.updateOne(
        { _id: new ObjectId(user_id) },
        { $push: { userReviews: review } }
    )
    if (updateUser.modifiedCount === 0) {
        throw (`Could not update user with id ${user_id}`);
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
        throw ("No document was updated in Product Collection. Review might already exist.");
    }

    // 初始化总评分为0
    let totalRatingForStore = 0;
    // 初始化参与评分计算的产品数量为0
    let ratedProductCount = 0;

    // 遍历所有产品ID
    for (const productId of store.products) {
        // 获取每个产品的详细信息
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        // 检查产品是否有评分
        if (product.productRating && product.productRating > 0) {
            totalRatingForStore += product.productRating;
            ratedProductCount += 1; // 仅计算有评分的产品
        }
    }

    // 计算平均评分，只考虑有评分的产品
    let storeRating = ratedProductCount > 0 ? totalRatingForStore / ratedProductCount : 0;

    const newInsertStoreInformation = await storeCollection.updateOne(
        { _id: new ObjectId(store_id) },
        { $set: { rating: storeRating } }
    );

    if (!newInsertStoreInformation) {
        throw ("No document was updated in Store Collection.");
    }

    review._id = review._id.toString();

    return review;
};
const removeReview = async (id) => {
    id = xss(id);
    id = helpers.checkId(id, 'review_id');

    const productsCollection = await products();
    const usersCollection = await users();
    const storeCollection = await stores();

    // 找到包含评论的产品
    const product = await productsCollection.findOne({ "productReviews._id": new ObjectId(id) });
    if (!product) throw (`Cannot find a product with the review id ${id}.`);

    // 找到并移除对应的评论
    let reviewToRemove = null;
    const updatedProductReviews = product.productReviews.filter(review => {
        if (review._id.toString() === id) {
            reviewToRemove = review;
            return false;
        }
        return true;
    });

    if (!reviewToRemove) {
        throw (`Review with id ${id} not found in product.`);
    }

    // 从用户集合中移除评论
    const updateUserResult = await usersCollection.updateOne(
        { _id: new ObjectId(reviewToRemove.user_id) },
        { $pull: { userReviews: { _id: new ObjectId(id) } } }
    );

    if (updateUserResult.modifiedCount === 0) {
        throw (`Could not remove review with id ${reviewToRemove._id} from user with id ${reviewToRemove.user_id}`);
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
                productReviews: updatedProductReviews,
                productRating: productRating
            }
        }
    );
    // 初始化总评分为0
    let totalRatingForStore = 0;
    // 初始化参与评分计算的产品数量为0
    let ratedProductCount = 0;

    const store = await storeCollection.findOne({ _id: new ObjectId(reviewToRemove.store_id) });
    if (!store) throw (`Cannot find a store with the review id ${reviewToRemove.store_id}.`);

    // 遍历所有产品ID
    for (const productId of store.products) {
        // 获取每个产品的详细信息
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        // 检查产品是否有评分
        if (product.productRating && product.productRating > 0) {
            totalRatingForStore += product.productRating;
            ratedProductCount += 1; // 仅计算有评分的产品
        }
    }

    // 计算平均评分，只考虑有评分的产品
    let storeRating = ratedProductCount > 0 ? totalRatingForStore / ratedProductCount : 0;

    const newInsertStoreInformation = await storeCollection.updateOne(
        { _id: new ObjectId(reviewToRemove.store_id) },
        { $set: { rating: storeRating } }
    );

    if (!newInsertStoreInformation) {
        throw ("No document was updated in Store Collection.");
    }

    //console.log(updatedInfo);
    return updatedInfo;
};


const updateReview = async (
    user_id, // must
    review_id, // must
    productReview,
    rating) => {
    user_id = helpers.checkId(user_id, 'user_id');
    review_id = helpers.checkId(review_id, 'review_id');
    const storeCollection = await stores();
    const productsCollection = await products();
   
    const product = await productsCollection.findOne({ "productReviews._id": new ObjectId(review_id) });
    //console.log(product);
    if (!product) throw (`Cannot find a product with the review id ${review_id}.`);

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
        throw (`Review with id ${review_id} not found.`);
    }

    // 更新用户集合中的评论
    const usersCollection = await users();
    const queryUser = { _id: new ObjectId(user_id), 'userReviews._id': new ObjectId(review_id) };
    const updateUserReview = {
        $set: {
            'userReviews.$': updatedReview // 更新整个匹配的 review 对象
        }
    };

    const updateUserResult = await usersCollection.updateOne(queryUser, updateUserReview);
    if (updateUserResult.modifiedCount === 0) {
        throw (`Could not update review in user with id ${user_id}`);
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
    // 初始化总评分为0
    let totalRatingForStore = 0;
    // 初始化参与评分计算的产品数量为0
    let ratedProductCount = 0;

    const store = await storeCollection.findOne({ _id: new ObjectId(updatedReview.store_id) });
    if (!store) throw (`Cannot find a store with the review id ${updatedReview.store_id}.`);

    // 遍历所有产品ID
    for (const productId of store.products) {
        // 获取每个产品的详细信息
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        // 检查产品是否有评分
        if (product.productRating && product.productRating > 0) {
            totalRatingForStore += product.productRating;
            ratedProductCount += 1; // 仅计算有评分的产品
        }
    }

    // 计算平均评分，只考虑有评分的产品
    let storeRating = ratedProductCount > 0 ? totalRatingForStore / ratedProductCount : 0;

    const newInsertStoreInformation = await storeCollection.updateOne(
        { _id: new ObjectId(updatedReview.store_id) },
        { $set: { rating: storeRating } }
    );

    if (!newInsertStoreInformation) {
        throw ("No document was updated in Store Collection.");
    }
    return updatedReview;
};


export {
    getAllReviews,
    // getReviewById,
    addReview,
    removeReview,
    updateReview,
};
