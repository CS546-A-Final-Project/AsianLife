import express from 'express';
import validation from '../validation.js';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
import { error } from 'console';
import xss from 'xss';
const router = express.Router();

router
    .route('/') // get all products from store ID?
    .get(async (req, res) => { // runs well
        try {  // should it be get all products by store id?
            const allProducts = await productsData.getAllProducts();
            if (!allProducts) {
                return res
                    .status(404)
                    .render('error', {
                        title: 'Products Error',
                        error: 'Products Not Found',
                    });
            }
            // res.status(200).json(allProducts); // for postman test
            res.status(200).render('products', { 
                title: 'product details',
                allProducts: allProducts });
        } catch (e) {
            return res
                .status(500)
                .render('error', { title: 'Internal Server Error', error: e });
        }
    })


router
    .route('/:productId') // get one product after add it
    .get(async (req, res) => { // runs well
        let productId = xss(req.params.productId); // updateId
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
        try {
            let product = await productsData.getProductById(productId);
            console.log(product);
            // return res.status(200).json(product);
            return res.status(200).render('products', {
                title: product.productName,
                product: product,
                productName: product.productName,
                productCategory: product.productCategory,
                productPrice: product.productPrice,
                manufactureDate: product.manufactureDate,
                expirationDate: product.expirationDate,
                productReviews: product.productReviews,
                productImage: productImage
            });
        } catch (e) {
            res.status(404).render('products', { 
                hasErrors: true,
                errors: e 
            });
        }
    })
    .delete(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        try {
            productId = helpers.checkId(productId, 'product');
        } catch (e) {
            res.status(400).json({error: e.message})
            // res.status(400).render('products', { error: e });
        }
        try {
            let product = await productsData.removeProduct(productId);
            // return res.status(200).json("Delete successfully!" + product); // 检查删除的信息
            return res.status(200).render('products', { product, product });
        } catch (e) {
            // res.status(404).json({error: e.message});
            res.status(404).render('products', { error: e.message });
        }
    })
    // .put(async (req, res) => { // runs well
    //     let id = xss(req.params.productId);
    //     let productName = xss(req.body.productName);
    //     let productCategory = xss(req.body.productCategory);
    //     let productPrice = parseFloat(req.body.productPrice);
    //     let manufactureDate = xss(req.body.manufactureDate);
    //     let expirationDate = xss(req.body.expirationDate);
    
    //     try {
    //         id = helpers.checkId(id, 'productId');
    //         if (productName) productName = helpers.checkString(productName, 'productName');
    //         if (productCategory) productCategory = helpers.checkCategories(productCategory, 'productCategory');
    //         if (productPrice) productPrice = helpers.checkPrice(productPrice, 'productPrice');
    //         if (manufactureDate) manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    //         if (expirationDate) expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    //         if (manufactureDate && expirationDate) helpers.checkDateValid(manufactureDate, expirationDate);
    //     } catch (e) {
    //         return res.status(400).json({ error: e.message });
    //     }    
    //     try {
    //         const result = await productsData.updateProduct(
    //             id,
    //             productName,
    //             productCategory,
    //             productPrice,
    //             manufactureDate,
    //             expirationDate
    //         );
    //         // console.log(result);
    //         if (result.modifiedCount === 0) {
    //             throw new Error(`The update of Product ${id} failed.`);
    //         }
    //         // res.status(200).json({ message: `Product ${id} updated successfully.` });
    //         res.status(200).render('products', {
    //             title: 'product',
    //             product: updatedProduct
    //         });
    //     } catch (e) {
    //         // res.status(500).json({ error: e.message });
    //         res.status(500).render('products', { error: e.message });
    //     }
    // });
    

    router
    .route('/:productId/reviews')
    .get(async (req, res) => { // get all reviews for a product
        let id = xss(req.params.productId);
        try {
            id = helpers.checkId(id, 'productId');
        } catch (e) {
            // res.status(400).json({error: e.message});
            return res.status(400).render('products', { error: e.message });
        }
        try {
            let productReviews = await reviewsForProductsData.getAllReviews(id);
            //return res.status(200).json(reviewForProducts);
            return res.status(200).render('products', { 
                productReviews: productReviews,
                user_id: user_id });
        } catch (e) {
            // res.status(400).json({error: e.message});
            return res.status(404).render('products', { error: e.message });
        }
    })
    .post(async (req, res) => { // add a review for a product
        let user_id = xss(req.session.user.id);
        let productId = xss(req.params.productId);
        let productReview = xss(req.body.productReviews);
        let rating = xss(req.body.rating);
        let errors = [];
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            errors.push(e);
        }
        try {
            productReview = helpers.checkReview(productReview, 'productReview');
        } catch (e) {
            errors.push(e);
        }
        try {
            rating = helpers.checkRating(rating, 'rating');
        } catch (e) {
            errors.push(e);
        }
        try {
            productReview = reviewsForProductsData.addReview(
                user_id,
                productId,
                productReview,
                rating
            )
        } catch (e) {
            errors.push(e);
        }
        if (errors.length > 0) {
            return res.status(400).render('products', {
                productName: productName,
                productReview: productReview,
                rating: rating,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
    })

    .delete(async (req, res) => { // delete a review for a product
        let productId = xss(req.params.productId);
        try {
            productId = helpers.checkId(productId, 'productId');
            
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
        try {
            let deleteReview = reviewsForProductsData.removeReview(productId);
            res.status(200).render('products', )
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
    })
    .put(async (req, res) => {
        let id = xss(req.params.productId);
    });

export default router;
