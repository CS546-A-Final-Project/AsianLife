import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/:productId')
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

