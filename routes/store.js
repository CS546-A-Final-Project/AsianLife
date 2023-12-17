import express from 'express';
import { getUser } from '../data/users.js';
import { ObjectId } from "mongodb";
import { storesData, productsData } from "../data/index.js";
const router = express.Router();

    router.route('/:id').get(async (req, res) => {
    const storeId = req.params.id;
    const userRole = req.session.user.role
    try {
        if (!ObjectId.isValid(storeId)) {
            throw 'invalid object ID';
        }
    } catch (e) {
        return res.status(400).render('error', { error: e });
    }
    try {
        const store = await storesData.getStoreById(storeId);
        const storeProducts = await productsData.getAllProductsByStoreId(storeId);
        storeProducts.forEach(product => {
            product.firstReview = product.productReviews[0];
        });
        const user = req.session.user;
        if (store === null)
            throw "No store with that ID";
        const isOwner = user && user.id === store.admin_id;

        const theUser = await getUser(user.id);
        const role = user.role;
        let isAdminAndHasAStore = false;
        if (role === 'admin' && user.ownedStoreId && storeId !== user.ownedStoreId) {
            isAdminAndHasAStore = true;
        }
        res.status(200).render('store', {
            name: theUser.userName,
            avatarId: theUser.avatar,
            storeId: user.ownedStoreId,
            isAdminAndHasAStore: isAdminAndHasAStore,
            title: store.name,
            storeProducts: storeProducts,
            storeID: storeId,
            user: userRole,
            isOwner: isOwner
        });


    } catch (e) {
        return res.status(404).render('error', { error: e });
    }
}),

router.route('/').get(async (req, res) => {
    const id = req.session.user.id;
    const user = await getUser(id);
    const name = user.userName;
    try {
        const allStores = await storesData.getAllStores();
    
        res.status(200).render('storeList', { stores: allStores,
                                                name: name,
                                                avatarId: user.avatar}); 
    } catch (e) {
        return res.status(500).render('error', { error: 'Error fetching stores' }); 
    }
})

export default router;