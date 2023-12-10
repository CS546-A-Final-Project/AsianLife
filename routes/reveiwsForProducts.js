import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
const router = express.Router();
import xss from 'xss';
router
    .route('/reviewId')
    .get(async (req, res) => {
        let reviewId = xss(req.params.reviewId);
        try {
            reviewId = helpers.checkId(reviewId);
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
        try {
            let reviewForProducts = reviewsForProductsData.getReviewById(reviewId);
            return res.status(200).json(reviewForProducts);
            // return res.status(200).render('products', { error: e });
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .delete(async (req, res) => {
        let reviewId = xss(req.params.reviewId);
        try {
            reviewId = helpers.checkId(reviewId);
            let deleteReview = reviewsForProductsData.removeReview();
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    });
