import express from 'express';
import validation from '../validation.js';
import helper from '../helpers.js';
import {getAllProducts, getProductById} from '../data/products.js';
const router = express.Router ();

router.route ('/')
	.get (async (req, res) => {
		try {
			getAllProducts();

		} catch (e) {
			res.render();
		}
		
	});
