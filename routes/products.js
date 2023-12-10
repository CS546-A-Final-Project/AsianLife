import express from 'express';
import validation from '../validation.js';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
import { error } from 'console';
import xss from 'xss';
const router = express.Router();

router
    .route('/')
    .get(async (req, res) => { // runs well
        try {
            const allProducts = await productsData.getAllProducts();
            if (!allProducts) {
                return res
                    .status(404)
                    .render('error', {
                        title: 'Products Error',
                        error: 'Products Not Found',
                    });
            }
            res.status(200).json(allProducts); // for postman test
            // res.status(200).render('productsList', { allProducts: allProducts });
        } catch (e) {
            return res
                .status(500)
                .render('error', { title: 'Internal Server Error', error: e });
        }
    })
    .post(async (req, res) => {
        let newProduct = xss(req.body);
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({error: "You didn't provide any information."})
        }
        try {
            productName = helpers.checkString(newProduct.productName, "productName"); 
            productCategory = helpers.checkCategories(newProduct.productCategory, 'productCategory'); 
            productPrice = helpers.checkPrice(newProduct.productPrice, 'productPrice');
            manufactureDate = helpers.checkDateFormat(newProduct.manufactureDate, 'manufactureDate'); 
            expirationDate = helpers.checkDateFormat(newProduct.expirationDate, 'expirationDate'); 
            productReviews = helpers.checkReview(newProduct.productReviews, 'productReviews');
            // store应该改成id (store_name = newProduct.store_name); 
        } catch (e) {
            return res.status(400).json({error: e});
        }
       
        try {
            let product = await productsData.addProduct(
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,
                productReviews,
                store_id
            ); //add image
            res.status(200).json(product)
            //res.render('products', { product: product });
        } catch (e) {
            res.status(500).render('products', { error: "Internal Server Error" });
        }
    });

router
    .route('/:productId')
    // get one product from the webpage
    .get(async (req, res) => { // runs well
        let productId = xss(req.params.productId); // updateId
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
        try{
            let product = await productsData.getProductById(productId);
            return res.status(200).json(product);
            // return res.status(200).render('products', {
            //     title: 'product details',
            //     product: product,
            // });
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .delete(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        try {
            productId = helpers.checkId(productId, 'product');
        } catch (e) {
            res.status(400).render('products', { error: e });
        }   
        try{
            let product = await productsData.removeProduct(productId);
            return res.status(200).json(product); // 检查删除的信息
            // return res.status(200).render('products', { product, product });
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .put(async (req, res) => { // update
        let id = xss(req.params.productId);
        let updateInfo = xss(req.body);
        try {
            id = helpers.checkId(id, 'productId');
            if (productName) {
                productName = helpers.checkString(
                    updateInfo.productName,
                    'productName'
                );
                // productName = updateInfo.productName;
            }
            if (productCategory) {
                productCategory = helpers.checkCategories(
                    updateInfo.productCategory,
                    'productCategory'
                );
                // productCategory = updateInfo.productCategory;
            }
            if (productPrice) {
                productPrice = helpers.checkPrice(
                    updateInfo.productPrice,
                    'productPrice'
                );
                // productPrice = updateInfo.productPrice;
            }
            if (manufactureDate) {
                manufactureDate = helpers.checkDateFormat(
                    updateInfo.manufactureDate,
                    'manufactureDate'
                );
                // manufactureDate = updateInfo.manufactureDate;
            }
            if (expirationDate) {
                expirationDate = helpers.checkDateFormat(
                    updateInfo.expirationDate,
                    'expirationDate'
                );
                // expirationDate = updateInfo.expirationDate;
            }
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
        try {
            const result = productsData.updateProduct(
                id,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate
            );
            if (result.modifiedCount === 0) {
                throw new Error(`Update of Product ${id} failed.`);
            }
            // get the result and return
            let updatedProduct = await productsData.getProductById(id);
            res.status(200).render('products', {
                title: 'product',
                product: updatedProduct
            })
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    });

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
            let reviewForProducts = await reviewsForProductsData.getReviewById(reviewId);
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
            let deleteReview = await reviewsForProductsData.removeReview();
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .post(async (req, res) => { // add
        let reviewId = xss(req.params.reviewId);
        let review = {
            _id: new ObjectId(),
            user_id: user_id, // user name
            product_id: product_id, // product name
            store_id: product.store_id, // get store id from product directly
            productName: product.productName,
            productReviews: productReviews,
            rating: rating
        }
        await reviewsForProductsData.addReview(

        )

    })

export default router;
