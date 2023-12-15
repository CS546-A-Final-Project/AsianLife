import express from 'express';
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getUser } from '../data/users.js';
import { getAllStores } from '../data/stores.js';
const router = express.Router();

router.route('/').get(async (req, res) => {
    const title = "Home Page";
    const id = req.session.user.id;
    const role = req.session.user.role;
    const storeId = req.session.user.ownedStoreId;
    let isAdminAndHasAStore = false;
    if (role === 'admin' && storeId) {
        isAdminAndHasAStore = true;
    }
    const user = await getUser(id);
    const name = user.userName;
    const stores = await getAllStores();
    if (!stores) {
        return res.status(200).render('home',{
            title: title, 
            name: name,
            avatarId: user.avatar,
            hasStores: false,
            isAdminAndHasAStore: isAdminAndHasAStore,
            storeId: storeId,
        });
    }
    res.status(200).render('home',{
        title: title, 
        name: name,
        avatarId: user.avatar,
        hasStores: true,
        stores: stores,
        isAdminAndHasAStore: isAdminAndHasAStore,
        storeId: storeId,
    })
});


router.route('/search').post(async (req, res) => {
    const title = "Home Page";
    const id = req.session.user.id;
    const user = await getUser(id);
    const name = user.userName;
    res.status(200).render('home',{
        title: title, 
        name: name,
        avatarId: user.avatar,
        isAdminAndHasAStore: isAdminAndHasAStore,
        storeId: storeId,
        searchResult: "search result here",
    })
});


export default router;