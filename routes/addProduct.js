import express from 'express';
import multer from 'multer';
import path from 'path';
import xss from 'xss';
import * as productsData from '../data/products.js';
import helpers from '../helpers.js';

const router = express.Router();

// 配置 multer 用于文件上传
const upload = multer({
    dest: path.join(process.cwd(), "/public/images/products"), // 注意更改目录为产品图片目录
  });

router
    .route('/')
    .get(async (req, res) => { // runs well
        //res.status(200).json('get the page');
        res.status(200).render('addProduct', {
            title: "add Product",
            selected: { default: 'selected' }
        })
    })
    .post(upload.single("productImage"), async (req, res) => { // runs well!
        let user_id = xss(req.session.user.id);
        console.log("req.session.user" + req.session.user);
        console.log("user_id" + user_id);
        // let user_id = xss(req.body.user_id); // 这里要改！！！
        //console.log(user_id);
        // let store_id = xss(req.session.user.ownedStoreId);
        // let user_id = '657bc02fc13e0a261ef35b67'; // for test
        let store_id = xss(req.session.user.ownedStoreId);
        console.log("store_id" + store_id);
        // let store_id = '657bc02fc13e0a261ef35b68'; // for test
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        //console.log(typeof productPrice); //xss would make price a string
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        // productImage
        let productImage = req.file.filename;
        let errors = [];

        let newProduct = req.body;
        //console.log("req", req.body)
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information." });
        }
        try {
            user_id = helpers.checkId(user_id, 'user_id');
        } catch (e) {
            errors.push(e);
        }
        try {
            store_id = helpers.checkId(store_id, 'store_id'); 
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
            );
            await productsData.updateImage(productId, productImage);
            return res.status(200).redirect(`/products/${productId}`);
        } catch (e) {
            errors.push(e);
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
    })

export default router;