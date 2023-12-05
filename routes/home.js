import express from 'express';
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getUser } from '../data/users.js';
const router = express.Router();

router.route('/').get(async (req, res) => {
    const title = "Home Page";
    const id = req.session.user.id;
    const user = await getUser(id);
    const name = user.userName;
    res.status(200).render('home',{
        title: title, 
        name: name,
        avatarId: user.avatar,
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
        searchResult: "search result here"
    })
});


export default router;