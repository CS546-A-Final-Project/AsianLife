import express from 'express';
// import validation from '../validation.js';
import helpers from '../helpers.js';
import xss from 'xss';
import {addProduct, getAllProducts, getProductById, updateProduct} from '../data/products.js';
const router = express.Router ();

// already have /products in index.js
router.route ('/')
	.get (async (req, res) => {
		try {
			const allProducts = await getAllProducts();
			if (!allProducts) {
				return res.status(400).render('error', {title: "Products Error", error: "Cannot Load Products"});
			}
			res.render('products', { allProducts: allProducts })
		} catch (e) {
			return res.status(500).render('error', { title: "Internal Server Error", error: e });
		}		
	})
    .post (async (req, res)=> {
        let newProduct = xss(req.body);
        productName = newProduct.productName,
        productCategory = newProduct.productCategory,
        productPrice = newProduct.productPrice,
        manufactureDate = newProduct.manufactureDate,
        expirationDate = newProduct.expirationDate,
        productReviews = newProduct.productReviews, // 有问题！
        store_name = newProduct.store_name
        
        try {       
            let product = await addProduct(
                productName,
                productCategory,
                productPrice,
                manufactureDate,
                expirationDate,
                productReviews,
                store_name
                );//add image
            res.render('products', {product : product} )
        } catch (e) {
            res.status(404).render("products", {error: e});
    
        }
    })

router.route('/:id') 
    // get one product from the webpage
    .get(async (req, res) => {      
    try {     
        let id = xss(req.params.id);
        id = helpers.checkId(id, 'product');  
        let product = await getProductById(id);
        return res.render("products", {product, product});
    } catch (e) {
        res.status(404).render("products", {error: e});
    }
})
    .delete(async (req, res) => {
        try {           
            let id = xss(req.params.id);
            id = helpers.checkId(id, 'product'); 
            let product = await removeProduct(id);
            return res.render("products", {product, product});
        } catch (e) {
            res.status(404).render("products", {error: e});
        }
    })
    .put(async (req, res)=> {

        try {
            let id = xss(req.params.id);
            let updateInfo = xss(req.body);
            id = helpers.checkId(id, 'product'); 
            updateProduct(id, updateInfo);

        } catch (e) {

        }
    })

export default router;
