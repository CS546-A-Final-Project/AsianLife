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
    // .post(async (req, res) => { // runs well!
    //     // let user_id = xss(req.session.user._id).trim();
    //     let user_id = xss(req.body.user_id); // 这里要改！！！
    //     //console.log(user_id);
    //     let store_id = xss(req.body.store_id);
    //     //console.log(store_id);
    //     let productName = xss(req.body.productName);
    //     //console.log(productName);
    //     let productCategory = xss(req.body.productCategory);
    //     //console.log(productCategory);
    //     let productPrice = parseFloat(req.body.productPrice);
    //     //console.log(typeof productPrice); //xss would make price a string
    //     let manufactureDate = xss(req.body.manufactureDate);
    //     //console.log(manufactureDate);
    //     let expirationDate = xss(req.body.expirationDate);
    //     //console.log(expirationDate);

    //     let newProduct = req.body;
    //     console.log("req", req.body)
    //     if (!newProduct || Object.keys(newProduct).length === 0) {
    //         return res.status(400).json({ error: "You didn't provide any information." })
    //     }
    //     try {
    //         console.log("validation");
    //         // user_id = helpers.checkId(user_id, 'user_id');
    //         // store_id = helpers.checkId(store_id, 'store_id'); // store应该改成id (store_name = newProduct.store_name); 
    //         productName = helpers.checkString(productName, 'productName');
    //         productCategory = helpers.checkCategories(productCategory, 'productCategory');
    //         productPrice = helpers.checkPrice(productPrice, 'productPrice');
    //         manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    //         expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    //         helpers.checkDateValid(manufactureDate, expirationDate);        
    //     } catch (e) {
    //         console.error(e);
    //         return res.status(400).json({ error: e.message });
    //     }
    //     try {
    //         console.log("addProduct");
    //         let product = await productsData.addProduct(
    //             user_id,
    //             store_id,
    //             productName,
    //             productCategory,
    //             productPrice,
    //             manufactureDate,
    //             expirationDate,            
    //         ); //add image
    //         console.log("finished");
    //         res.status(200).json(product)
    //         //res.render('products', { product: product });
    //     } catch (e) {
    //         console.error(e)
    //         res.status(500).json({ error: e.message });
    //         //res.status(500).render('products', { error: "Internal Server Error" });
    //     }
    // });

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
        try {
            let product = await productsData.getProductById(productId);
            // return res.status(200).json(product);
            return res.status(200).render('products', {
                title: 'product details',
                product: product,
            });
        } catch (e) {
            res.status(404).render('products', { error: e });
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
            return res.status(200).json("Delete successfully!" + product); // 检查删除的信息
            // return res.status(200).render('products', { product, product });
        } catch (e) {
            res.status(404).json({error: e.message});
            // res.status(404).render('products', { error: e.message });
        }
    })
    .put(async (req, res) => { // runs well
        let id = xss(req.params.productId);
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(req.body.productPrice);
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
    
        try {
            id = helpers.checkId(id, 'productId');
            if (productName) productName = helpers.checkString(productName, 'productName');
            if (productCategory) productCategory = helpers.checkCategories(productCategory, 'productCategory');
            if (productPrice) productPrice = helpers.checkPrice(productPrice, 'productPrice');
            if (manufactureDate) manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
            if (expirationDate) expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
            if (manufactureDate && expirationDate) helpers.checkDateValid(manufactureDate, expirationDate);
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    
        try {
            const result = await productsData.updateProduct(
                id,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate
            );
            console.log(result);
            // if (result.modifiedCount === 0) {
            //     throw new Error(`The update of Product ${id} failed.`);
            // }
            res.status(200).json({ message: `Product ${id} updated successfully.` });
            // res.status(200).render('products', {
            //     title: 'product',
            //     product: updatedProduct
            // });
        } catch (e) {
            res.status(500).json({ error: e.message });
            // res.status(500).render('products', { error: e.message });
        }
    });
    

// router
// .route('/reviewId')
// .get(async (req, res) => {
//     let reviewId = xss(req.params.reviewId);
//     try {
//         reviewId = helpers.checkId(reviewId);
//     } catch (e) {
//         res.status(404).render('products', { error: e });
//     }
//     try {
//         let reviewForProducts = await reviewsForProductsData.getReviewById(reviewId);
//         return res.status(200).json(reviewForProducts);
//         // return res.status(200).render('products', { error: e });
//     } catch (e) {
//         res.status(404).render('products', { error: e });
//     }
// })
// .delete(async (req, res) => {
//     let reviewId = xss(req.params.reviewId);
//     try {
//         reviewId = helpers.checkId(reviewId);
//         let deleteReview = await reviewsForProductsData.removeReview();
//     } catch (e) {
//         res.status(404).render('products', { error: e });
//     }
// })
// .post(async (req, res) => { // add
//     let reviewId = xss(req.params.reviewId);
//     let review = {
//         _id: new ObjectId(),
//         user_id: user_id, // user name
//         product_id: product_id, // product name
//         store_id: product.store_id, // get store id from product directly
//         productName: product.productName,
//         productReviews: productReviews,
//         rating: rating
//     }
//     await reviewsForProductsData.addReview(

//     )

// })

export default router;
