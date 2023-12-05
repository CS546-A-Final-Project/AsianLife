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

router.route('/:id').get(async (req, res) => {
    const title = "Home Page";
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            throw 'invalid object ID';
        }
    } catch (e) {
        return res.status(400).render('error', { error: e });
    }
    try {
        const id = req.params.id;
        const userCollection = await users();
        const isFound = await userCollection.findOne({ _id: new ObjectId(id) });
        if (isFound === null) 
            throw "No user with that ID";

        res.status(200).render('home', {title: title, id: id});
    } catch (e) {
        return res.status(404).render('error', { error: e });
    }
     //return res.render('home', { title: title });
});

router.route('/').post(async (req, res) => {
    try {


    } catch (e) {
        return res.status(400).render('error', { title: title, error: e });
    }

});

router.route('/marvelcharacter/:id').get(async (req, res) => {
    try {

    } catch (e) {
        res.status(404).render('error', { title: "404 NOT FOUND", error: "There is no character found for the given ID!" });
    }
});

export default router;