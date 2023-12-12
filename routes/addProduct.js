import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import * as reviewsForProductsData from '../data/reviewsforproducts.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/')
    .get(async (req, res) => { // runs well
        res.status(200).render('addProduct', {
            title: "add Product",
            selected: { default: 'selected' }
        })
    })
    .post(async (req, res) => { // error!
        // let user_id = xss(req.session.user._id).trim();
        let user_id = xss(req.body.user_id).trim(); // 这里要改！！！
        let store_id = xss(req.body.store_id).trim();
        let productName = xss(req.body.productName).trim();
        let productCategory = xss(req.body.productCategory).trim();
        let productPrice = xss(req.body.productPrice).trim();
        let manufactureDate = xss(req.body.manufactureDate).trim();
        let expirationDate = xss(req.body.expirationDate).trim();

        let newProduct = req.body;
        console.log("req", req.body)
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information." })
        }
        try {
            console.log("hereeee")
            // user_id = helpers.checkId(user_id, 'user_id');
            // store_id = helpers.checkId(store_id, 'store_id'); // store应该改成id (store_name = newProduct.store_name); 
            productName = helpers.checkString(productName, 'productName');
            productCategory = helpers.checkCategories(productCategory, 'productCategory');
            productPrice = helpers.checkPrice(productPrice, 'productPrice');
            manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
            expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
            helpers.checkDateValid(manufactureDate, expirationDate);        
        } catch (e) {
            return res.status(400).json({ error: e });
        }
        try {
            let product = await productsData.addProduct(
                user_id,
                store_id,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,
            ); //add image
            res.status(200).json(product)
            //res.render('products', { product: product });
        } catch (e) {
            res.status(500).json({ error: e });
            //res.status(500).render('products', { error: "Internal Server Error" });
        }
    });

export default router;