import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
const router = express.Router();
import xss from 'xss';

router
    .route('/:productId')
    .get(async (req, res) => { // get all reviews for a product
        let id = xss(req.params.productId);
        try {
            id = helpers.checkId(id);
        } catch (e) {
            res.status(400).json({error: e.message});
            // return res.status(400).render('products', { error: e.message });
        }
        try {
            let reviewForProducts = await reviewsForProductsData.getAllReviews(id);
            //return res.status(200).json(reviewForProducts);
            return res.status(200).render('product', { reviews: reviewForProducts });
        } catch (e) {
            res.status(400).json({error: e.message});
            // return res.status(404).render('products', { error: e.message });
        }
    })
    .post(async (req, res) => { // add a review for a product
        let id = xss(req.params.productId);
        let productReviews = xss(req.body.productReviews);
        try {

        } catch (e) {
            res.status(400).render('products', { error: e });
        }
        try {

        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .delete(async (req, res) => { // delete a review for a product
        let id = xss(req.params.productId);
        try {
            id = helpers.checkId(id);
            let deleteReview = reviewsForProductsData.removeReview();
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .put(async (req, res) => {
        let id = xss(req.params.productId);
    });
export default router;