import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/')
    .get(async (req, res) => { // runs well
        //res.status(200).json('get the page');
        res.status(200).render('addProduct', {
            title: "add Product",
            selected: { default: 'selected' }
        })
    })
    .post(async (req, res) => { // runs well!
        // let user_id = xss(req.session.user._id).trim();
        let user_id = xss(req.body.user_id); // 这里要改！！！
        //console.log(user_id);
        let store_id = xss(req.body.store_id);      
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        //console.log(typeof productPrice); //xss would make price a string
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        let errors = [];

        let newProduct = req.body;
        //console.log("req", req.body)
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information." });
        }
        try {
            // user_id = helpers.checkId(user_id, 'user_id');
        } catch (e) {
            errors.push(e);
        }
        try {
            // store_id = helpers.checkId(store_id, 'store_id'); // store应该改成id (store_name = newProduct.store_name); 
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
        // after validation, now starts add product
        try {
            // console.log("addProduct");
            let productId = await productsData.addProduct(
                user_id,
                store_id,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,
            ); //add image
            //console.log("finished");
            //res.status(200).json(product);
            return res.status(200).redirect(`/products/${productId}`);
        } catch (e) {
            errors.push(e);
            //console.error(e)
            // return res.status(500).json({ error: e.message });
            // res.status(500).render('products', { error: "Internal Server Error" });
        }
        if (errors.length > 0) {
            const selected = { [`${productCategory}`]: 'selected' };
            return res.status(400).render('addProduct', {
                title: "add Product",
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
    });

export default router;