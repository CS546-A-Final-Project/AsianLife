import express from 'express';
import validation from '../validation.js';
import helper from '../helpers.js';
import {getAllProducts, getProductById} from '../data/products.js';
const router = express.Router ();

router.route ('/')
	.get (async (req, res) => {
		try {
			const allProducts = await getAllProducts();
			if (!allProducts) {
				return res.status(400).render('error', {title: "Products Error", error: "Cannot Load Products"});
			}
			res.render('productsList', { allProducts: allProducts })
		} catch (e) {
			return res.status(500).render('error', { title: "Internal Server Error", error: e });
		}
		
	});

router.route('/product')
    .get(async (req, res) => {

})

export default router;
