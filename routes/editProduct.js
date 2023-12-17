import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/:productId')
    .get(async (req, res) => { // runs well
        const productId = req.params.productId;
        const product = await productsData.getProductById(productId);
        res.status(200).render('editProduct', {
            title: "edit Product",
            productId: productId,
            product: product,
            selected: { [`${product.productCategory.replace(/\s+/g, '')}`]: "selected" }
        })
    })
    .post(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        let productImage;
        if (req.file && req.file.filename) {
            productImage = xss(req.file.filename);
        } else {
            const product = await productsData.getProductById(productId);
            productImage = product.productImage;
        }  
        let errors = [];

        let newProduct = req.body;   
        // console.log(req);   
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information to update." });
        }
        try {
            productId = helpers.checkId(productId, 'productId');
        } catch (e) {
            errors.push(e);
        }
        try {
            productName = helpers.checkString(productName, 'productName');
        } catch (e) {
            errors.push(e);
        }
        try {
            productCategory = helpers.checkCategories(productCategory, 'productCategory');
        } catch (e) {
            errors.push(e);
        }
        try {
            productPrice = helpers.checkPrice(productPrice, 'productPrice');
        } catch (e) {
            errors.push(e);
        }
        try {
            manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
        } catch (e) {
            errors.push(e);
        }
        try {
            expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
        } catch (e) {
            errors.push(e);
        }
        try {
            helpers.checkDateValid(manufactureDate, expirationDate);
        } catch (e) {
            errors.push(e);
        }
        try {
          await productsData.updateProduct(
                productId, // must
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate
            );
            await productsData.updateImage(productId, productImage);
            return res.status(200).redirect(`/products/${productId}`);
        } catch (e) {
            errors.push(e);
        };
        if (errors.length > 0) {
            const productId = req.params.productId;
            const product = await productsData.getProductById(productId);
            const selected = { [`${productCategory}`]: 'selected' };
            return res.status(400).render('editProduct', {
                title: "edit Product",
                productId: productId,
                product: product,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
    })
    .delete(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        let store_id = xss(req.session.user.ownedStoreId);
        try {
            productId = helpers.checkId(productId, 'product');
        } catch (e) {
            // res.status(400).json({ error: e.message })
            res.status(400).render('products', { error: e });
        }
        try {
            let product = await productsData.removeProduct(productId, store_id);
            return res.status(200).json("Delete successfully!" + product); // 检查删除的信息
            // return res.status(200).render('products', { product, product });
        } catch (e) {
            console.log("--------------------------What's wrong-----------------------------")
            res.status(404).json({error: e});

            // res.status(404).render('products', { error: e.message });
        }
    })

export default router;