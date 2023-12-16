import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
import xss from 'xss';
const router = express.Router();


router
    .route('/:productId') // get one product after add it
    .get(async (req, res) => { 
        let productId = xss(req.params.productId); 
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            res.status(400).render('products', { 
                hasErrors: true,
                errors: e });
        }
        try {
            let product = await productsData.getProductById(productId);
            const storeId = product.store_id;
            let isAdminOfThisStore = false;
            if (storeId === req.session.user.ownedStoreId) {
                isAdminOfThisStore = true;
            }
            return res.status(200).render('products', {
                title: product.productName,
                hasProduct: true,
                isAdminOfThisStore: isAdminOfThisStore,
                productName: product.productName,
                productCategory: product.productCategory,
                productPrice: product.productPrice,
                manufactureDate: product.manufactureDate,
                expirationDate: product.expirationDate,
                productReviews: product.productReviews,
                productImage: product.productImage,
                productId: productId // for add reviews
            });

        } catch (e) {
            res.status(404).render('error', {
                errors: e.message
            });
        }
    })
    .post(async (req, res) => { // add a review for a product
        let user_id = xss(req.session.user.id);
        // let prodcutId = 
        let productId = xss(req.params.productId);  // for test
        let store_id = xss(req.session.user.ownedStoreId); // for test
        let productReviewsG = xss(req.body.productReviews);
        let rating = parseInt(xss(req.body.productRating));
        let errors = [];
        try {
            user_id = helpers.checkId(user_id, 'user_id');
        } catch (e) {
            errors.push(e);
        }
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            errors.push(e);
        }
        try {
            store_id = helpers.checkId(store_id, 'store_id');
        } catch (e) {
            errors.push(e);
        }
        try {
            productReviewsG = helpers.checkReview(productReviewsG, 'productReview');
        } catch (e) {
            errors.push(e);
        }
        try {
            rating = helpers.checkRating(rating, 'rating');
        } catch (e) {
            errors.push(e);
        }
        try {
             await reviewsForProductsData.addReview(
                user_id,
                productId,
                store_id,
                productReviewsG,
                rating
            )
            res.status(200).redirect(`/products/${productId}`);
        } catch (e) {
            errors.push(e);
        }
        if (errors.length > 0) {
            return res.status(400).render('products', {
                productName: productName,
                productReviews: productReviewsG,
                rating: rating,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
    })



// router
//     .route('/:productId/reviews')
//     .get(async (req, res) => { // get all reviews for a product
//         let id = xss(req.params.productId);
//         try {
//             id = helpers.checkId(id, 'productId');
//         } catch (e) {
//             // res.status(400).json({error: e.message});
//             return res.status(400).render('products', {
//                 hasErrors: true,
//                 errors: e.message
//             });
//         }
//         try {
//             let productReviews = await reviewsForProductsData.getAllReviews(id);
//             let product = await productsData.getProductById(id);
//             return res.status(200).render('products', {
//                 title: product.productName,
//                 hasProduct: true,
//                 productName: product.productName,
//                 productCategory: product.productCategory,
//                 productPrice: product.productPrice,
//                 manufactureDate: product.manufactureDate,
//                 expirationDate: product.expirationDate,
//                 productReviews: productReviews,
//                 productImage: product.productImage
//             });
//         } catch (e) {
//             // res.status(400).json({error: e.message});
//             return res.status(404).render('products', {
//                 hasErrors: true,
//                 errors: e.message
//             });
//         }
//     })
    // .post(async (req, res) => { // add a review for a product
    //     let user_id = xss(req.session.user.id);
    //     let productId = xss(req.params.productId); // for test
    //     let store_id = xss(req.session.user.ownedStoreId); // for test
    //     let productReviewsG = xss(req.body.productReviews);
    //     let rating = parseInt(xss(req.body.productRating));
    //     let errors = [];
    //     try {
    //         user_id = helpers.checkId(user_id, 'user_id');
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     try {
    //         productId = helpers.checkId(productId, 'productId');
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     try {
    //         store_id = helpers.checkId(store_id, 'store_id');
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     try {
    //         productReviewsG = helpers.checkReview(productReviewsG, 'productReview');
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     try {
    //         rating = helpers.checkRating(rating, 'rating');
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     try {
    //         const productReviewsResult = await reviewsForProductsData.addReview(
    //             user_id,
    //             productId,
    //             store_id,
    //             productReviewsG,
    //             rating
    //         )
    //         // return res.json(productReviewsResult);
    //         res.status(200).redirect(`/product/${productId}`);
    //     } catch (e) {
    //         errors.push(e);
    //     }
    //     if (errors.length > 0) {
    //         return res.status(400).render('products', {
    //             productName: productName,
    //             productReviews: productReviewsG,
    //             rating: rating,
    //             selected: selected,
    //             hasErrors: true,
    //             errors: errors,
    //         })
    //     }
    // })
    // 下面两个功能需要从user profile页面实现
  

export default router;
