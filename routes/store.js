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
        const storeProducts = await productsData.getAllProductsByStoreId(storeId);
        // const store = await storesData.getStoreById(storeId);
        // const storeProducts = allProducts.filter(product => product.store_id === storeId);
        // if (store === null) 
        //     throw "No store with that ID";
        res.status(200).render('store', { 
            storeProducts: storeProducts});
    } catch (e) {
        return res.status(404).render('error', { error: e });
    }
});

export default router;