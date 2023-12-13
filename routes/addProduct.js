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
        //console.log(store_id);
        let productName = xss(req.body.productName);
        //console.log(productName);
        let productCategory = xss(req.body.productCategory);
        //console.log(productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        //console.log(typeof productPrice); //xss would make price a string
        let manufactureDate = xss(req.body.manufactureDate);
        //console.log(manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        //console.log(expirationDate);

        let newProduct = req.body;
        //console.log("req", req.body)
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information." })
        }
        try {
            console.log("validation");
            // user_id = helpers.checkId(user_id, 'user_id');
            // store_id = helpers.checkId(store_id, 'store_id'); // store应该改成id (store_name = newProduct.store_name); 
            productName = helpers.checkString(productName, 'productName');
            productCategory = helpers.checkCategories(productCategory, 'productCategory');
            productPrice = helpers.checkPrice(productPrice, 'productPrice');
            manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
            expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
            helpers.checkDateValid(manufactureDate, expirationDate);        
        } catch (e) {
            console.error(e);
            return res.status(400).json({ error: e.message });
        }
        try {
            console.log("addProduct");
            let product = await productsData.addProduct(
                user_id,
                store_id,
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,            
            ); //add image
            console.log("finished");
            //res.status(200).json(product)
            res.status(200).render('products', { product: product });
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e.message });
            //res.status(500).render('products', { error: "Internal Server Error" });
        }
    });

export default router;