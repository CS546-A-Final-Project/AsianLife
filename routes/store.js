import express from 'express';

import { ObjectId } from "mongodb";
import { storesData, productsData} from "../data/index.js";
const router = express.Router();

router.route('/:id').get(async (req, res) => {
    const storeId = req.params.id;
    try {
        if (!ObjectId.isValid(storeId)) {
            throw 'invalid object ID';
        }
    } catch (e) {
        return res.status(400).render('error', { error: e });
    }
    try {

        const allProducts = await productsData.getAllProducts();
        const store = await storesData.getStoreById(storeId);
        const storeProducts = allProducts.filter(product => product.store_id === storeId);
        if (store === null) 
            res.status(200).render('home');
        res.status(200).render('store', { storeProducts: storeProducts, store: store});
    } catch (e) {
        return res.status(404).render('error', { error: e });
    }
});

export default router;