import express from 'express';
import helpers from '../helpers.js';
import * as productsData from '../data/products.js';
import xss from 'xss';
const router = express.Router();

router
    .route('/:productId')
    .get(async (req, res) => { // runs well
        res.status(200).render('editProduct', {
            title: "edit Product",
            selected: { default: 'selected' }
        })
    })
    .put(async (req, res) => { // runs well
        let productId = xss(req.params.productId);
        let productName = xss(req.body.productName);
        let productCategory = xss(req.body.productCategory);
        let productPrice = parseFloat(xss(req.body.productPrice));
        let manufactureDate = xss(req.body.manufactureDate);
        let expirationDate = xss(req.body.expirationDate);
        let errors = [];

        let newProduct = req.body;   
        console.log(req);   
        if (!newProduct || Object.keys(newProduct).length === 0) {
            return res.status(400).json({ error: "You didn't provide any information to update." });
        }
        try {
            productId = helpers.checkId(productId, 'productId'); 
        } catch (e) {
            errors.push(e);
        };
        try {
            if(!productName) {
                productName = helpers.checkString(productName, 'productName');
            }
           
        } catch (e) {
            errors.push(e);
        };
        try {
            if(productCategory){
                productCategory = helpers.checkCategories(productCategory, 'productCategory');
            }
            
        } catch (e) {
            errors.push(e);
        }
        try {
            if (productPrice) {
                productPrice = helpers.checkPrice(productPrice, 'productPrice');
            }
            
        } catch (e) {
            errors.push(e);
        };
        try {
            if(manufactureDate) {
            manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
            const product = productsData.getProductById(productId);            
            helpers.checkDateValid(manufactureDate, product.expirationDate);
        }         
        } catch (e) {
            errors.push(e);
        };
        try {
            if (expirationDate) {
                 expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
                 const product = productsData.getProductById(productId);
                 helpers.checkDateValid(product.manufactureDate, expirationDate);
            }
        } catch (e) {
            errors.push(e);
        };
        try {
            if (manufactureDate && expirationDate) {
                helpers.checkDateValid(manufactureDate, expirationDate);
            }         
        } catch (e) {
            errors.push(e);
        };

        try {
            const result = await productsData.updateProduct(
                productId, // must
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate
            );
            console.log("________________________edit product?_____________________________");
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
        let store_id = xss(req.session.user.ownedStoreId);
        console.log("-------------------click here--------------------------");
        try {
            productId = helpers.checkId(productId, 'product');
        } catch (e) {
            res.status(400).json({ error: e.message })
            // res.status(400).render('products', { error: e });
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