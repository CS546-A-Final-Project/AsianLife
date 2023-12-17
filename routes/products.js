import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
import { getReviewByReviewId, updateReview } from '../data/reviewsforproducts.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/:productId') // get one product after add it
    .get(async (req, res) => {
        let productId = xss(req.params.productId);
        // let user_id = xss(req.session.user.id);
        try {
            productId = helpers.checkId(productId, 'productId');
            // user_id = helpers.checkId(user_id, "user_id");
        } catch (e) {
            return res.status(400).render('products', {
                hasErrors: true,
                errors: e
            });
        }
        try {
            let product = await productsData.getProductById(productId);
            // let userName = await reviewsForProductsData.get(user_id);
            const storeId = product.store_id;
            let isAdminOfThisStore = false;
            if (storeId === req.session.user.ownedStoreId) {
                isAdminOfThisStore = true;
            }
            return res.status(200).render('products', {
                title: product.productName,
                hasProduct: true,
                isAdminOfThisStore: isAdminOfThisStore,
                // userName:userName,
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
            return res.status(404).render('error', {
                errors: e
            });
        }
    })
    .post(async (req, res) => { // 加评论！！！add a review for a product
        let user_id = xss(req.session.user.id);
        let productId = xss(req.params.productId); // for test
        let store_id = xss(req.session.user.ownedStoreId); // for test
        let productReviews = xss(req.body.productReviews);
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
            productReviews = helpers.checkReview(productReviews, 'productReview');
        } catch (e) {
            errors.push(e);
        }
        try {
            rating = helpers.checkRating(rating, 'rating');
        } catch (e) {
            errors.push(e);
        }
        if (errors.length > 0) {
            return res.status(400).render('products', {
                productName: productName,
                productReviews: productReviews,
                rating: rating,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
        errors = [];
        try {
            await reviewsForProductsData.addReview(
                user_id,
                productId,
                store_id,
                productReviews,
                rating
            )
            res.status(200).redirect(`/product/${productId}`);
        } catch (e) {
            errors.push(e);
        }
        if (errors.length > 0) {
            return res.status(400).render('products', {
                productName: productName,
                productReviews: productReviews,
                rating: rating,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
    })


router
    .route('/:productId/:reviewId')
    .get(async (req, res) => {
        let id = xss(req.params.productId);
        let reviewId = xss(req.params.reviewId);
        try {
            id = helpers.checkId(id, 'productId');
            reviewId = helpers.checkId(reviewId, 'reviewId');
        } catch (e) {
            return res.status(404).render('error', {
                error: e
            });
        }
        try {
            let product = await productsData.getProductById(id);
            let review = await getReviewByReviewId(reviewId);
            let content, rating;
            if (review) {
                content = review.productReviews;
                rating = review.rating;
            }
            let selected;
            let option;
            if (rating === 1) {
                option = 'a';
            } else if (rating === 2) {
                option = 'b';
            } else if (rating === 3) {
                option = 'c';
            } else if (rating === 4) {
                option = 'd';
            } else if (rating === 5) {
                option = 'e';
            }
            if (rating) {
                selected = { [option]: "selected" };
            } else {
                selected = { default: "selected" };
            }

            return res.status(200).render('updateReview', {
                product: product,
                reviewId: reviewId,
                review: content,
                selected: selected,
            });
        } catch (e) {
            return res.status(404).render('error', {
                error: e
            });
        }
    })
    .post(async (req, res) => {
        let id = xss(req.params.productId);
        let reviewId = xss(req.params.reviewId);
        let review = xss(req.body.productReviews);
        let rating = parseInt(xss(req.body.productRating));
        let product;
        let selected;
        let option;
        let errors = [];
        try {
            product = await productsData.getProductById(id);
        } catch (e) {
            errors.push(e);
        }
        try {
            id = helpers.checkId(id, 'productId');
        } catch (e) {
            errors.push(e);
        }
        try {
            reviewId = helpers.checkId(reviewId, 'reviewId');
        } catch (e) {
            errors.push(e);
        }
        try {
            review = helpers.checkReview(review);
        } catch (e) {
            errors.push(e);
        }
        try {
            rating = helpers.checkRating(rating);
        } catch (e) {
            errors.push(e);
        }

        if (rating === 1) {
            option = 'a';
        } else if (rating === 2) {
            option = 'b';
        } else if (rating === 3) {
            option = 'c';
        } else if (rating === 4) {
            option = 'd';
        } else if (rating === 5) {
            option = 'e';
        }
        if (rating) {
            selected = { [option]: "selected" };
        } else {
            selected = { default: "selected" };
        }
        if (errors.length > 0) {
            return res.status(400).render('updateReview', {
                selected: selected,
                review: review,
                reviewId: reviewId,
                product: product,
                hasErrors: true,
                errors: errors,
            });
        }
        let updatedReview;
        try {
            updatedReview = await updateReview(req.session.user.id, reviewId, review, rating);
        } catch (e) {
            return res.status(400).render('updateReview', {
                selected: selected,
                review: review,
                reviewId: reviewId,
                product: product,
                hasErrors: true,
                errors: e,
            });
        }
        if (!updateReview) {
            return res.status(500).render('error', { title: "Internal Server Error", error: "Internal Server Error" });
        }
        return res.redirect('/profile');
    })

    .delete(async (req, res) => {
        let productId = xss(req.params.productId);
        let reviewId = xss(req.params.reviewId);
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            return res.status(404).render('error', { error: e });
        }
        try {
            reviewId = helpers.checkId(reviewId, 'reviewId');
        } catch (e) {
            return res.status(404).render('error', { error: e });
        }
        try {
            let deleteReview = reviewsForProductsData.removeReview(reviewId);
            if (!deleteReview) {
                return res.json({ deleteReview: false });
            }
            return res.json({ deleteReview: true });
        } catch (e) {
            res.status(400).render('error', { error: e });
        }
    })

export default router;
