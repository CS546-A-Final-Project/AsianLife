import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/:productId')
    .put(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        let errors = [];

        let newProduct = req.body;      
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information." });
        }
        try {
            productId = helpers.checkId(productId, 'productId'); 
        } catch (e) {
            errors.push(e);
        };
        try {
            productName = helpers.checkString(productName, 'productName');
        } catch (e) {
            errors.push(e);
        };
        try {
            productCategory = helpers.checkCategories(productCategory, 'productCategory');
        } catch (e) {
            errors.push(e);
        }
        try {
            productPrice = helpers.checkPrice(productPrice, 'productPrice');
        } catch (e) {
            errors.push(e);
        };
        try {
            manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
        } catch (e) {
            errors.push(e);
        };
        try {
            expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
        } catch (e) {
            errors.push(e);
        };
        try {
            helpers.checkDateValid(manufactureDate, expirationDate);
        } catch (e) {
            errors.push(e);
        };

        try {
            const result = await productsData.updateProduct(
                productId,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate
            );
            console.log(result);
            // res.status(200).json({ message: `Product ${productId} updated successfully.` });
            await productsData.updateImage(productId, productImage);
            return res.status(200).redirect(`/products/${productId}`);
        } catch (e) {
            errors.push(e);
        };
        if (errors.length > 0) {
            const selected = { [`${productCategory}`]: 'selected' };
            return res.status(400).render('editProduct', {
                title: "edit Product",
                productName: productName,
                productCategory: productCategory,
                productPrice: productPrice,
                manufactureDate: manufactureDate,
                expirationDate: expirationDate,
                selected: selected,
                hasErrors: true,
                errors: errors,
            })
        }
    })
    .delete(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        try {
            productId = helpers.checkId(productId, 'product');
        } catch (e) {
            res.status(400).json({ error: e.message })
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

