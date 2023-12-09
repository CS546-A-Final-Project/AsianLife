import express from 'express';
import validation from '../validation.js';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
const router = express.Router();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const allProducts = await getAllProducts();
            if (!allProducts) {
                return res
                    .status(400)
                    .render('error', {
                        title: 'Products Error',
                        error: 'Cannot Load Products',
                    });
            }
            res.render('productsList', { allProducts: allProducts });
        } catch (e) {
            return res
                .status(500)
                .render('error', { title: 'Internal Server Error', error: e });
        }
    })
    .post(async (req, res) => {
        let newProduct = xss(req.body);
        (productName = newProduct.productName), (productCategory =
            newProduct.productCategory), (productPrice =
                newProduct.productPrice), (manufactureDate =
                    newProduct.manufactureDate), (expirationDate =
                        newProduct.expirationDate), (productReviews =
                            newProduct.productReviews), (store_name = newProduct.store_name); // 有问题！

        try {
            let product = await addProduct(
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,
                productReviews,
                store_name
            ); //add image
            res.render('products', { product: product });
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    });

router
    .route('/:productId')
    // get one product from the webpage
    .get(async (req, res) => {
        let id = xss(req.params.productId); // updateId
        try {
            id = helpers.checkId(id, 'productId');
            let product = await getProductById(id);
            return res.status(200).render('products', {
                title: 'product details',
                product: product,
            });
        } catch (e) {
            res.status(400).render('products', { error: e });
        }
    })
    .delete(async (req, res) => {
        let id = xss(req.params.productId);
        try {
            id = helpers.checkId(id, 'product');
            let product = await removeProduct(id);
            return res.render('products', { product, product });
        } catch (e) {
            res.status(404).render('products', { error: e });
        }
    })
    .put(async (req, res) => {
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

export default router;
