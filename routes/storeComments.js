import express from 'express';
<<<<<<< Updated upstream

=======
import xss from "xss";
>>>>>>> Stashed changes
import { ObjectId } from "mongodb";
import { commentsforstoresData, storesData } from "../data/index.js";
const router = express.Router();

<<<<<<< Updated upstream
//当点进storecomments button的时候hit
router.route('/:id').get(async (req, res) => {

    let user = req.session.user 
    
    let storeId = req.params.id//佳骏传进一个storeid;

    
    // try{
    //     checkId(storeId)
    // }catch(e){
    //     return res.status(400).render('error', {title: "Error", message: "no comments of this store for now"})
    // }

    try{
        let isUser = true;
        const storeName = storesData.getStoreById(storeId).name;
        const commentList = commentsforstoresData.getAllComments(storeId);//返回id,comment,answer
        const rating = storesData.getStoreById(storeId).rating;
        if(user.role !== 'user') {
            isUser = false;
        }
        const answer = commentsforstoresData.getAnswerById(Id)
        res.render("storeComment", {title: storeName, commentList: commentList, answer: answer , isUser: isUser, rating:rating})
=======

router.route('/:store_id').get(async (req, res) => {//get all comment for this store

    let user = req.session.user 
    
    let storeid = xss(req.params.store_id)//Noah send a store_id;

    
    try{
        checkId(storeid)
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }

    try{
        let isUser = true;//for determining if have right to comment;
        const storeName = await storesData.getStoreById(storeid).name;
        const commentList = await commentsforstoresData.getAllComments(storeid);
        const rating = await storesData.getStoreById(storeid).rating;
        if(user.role !== 'user') {
            isUser = false;
        }
        res.render("storeComments", {title: storeName, commentList: commentList, isUser: isUser, rating:rating})
>>>>>>> Stashed changes
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }
    })
<<<<<<< Updated upstream
    .post(async (req, res) => {
        // let { user_id, store_id, commentInput, rating} = req.body //和佳俊对接

        let user = req.session.user;
        let store_id = req.params.id;
        let user_id = user._id;
        let rating = storesData.getStoreById(store_id).rating;
        let storeName = storesData.getStoreById(store_id).name;
        let commentInput = req.body.commentInput;
        let isUser = true;
        if(user.role !== 'user') {
            isUser = false;
        }
        try{
            checkString(commentInput, "Newcomment");
=======
    .post(async (req, res) => { //add a comment for this store(realize delete at commentDetail page)
        let user = req.session.user;
        let user_id = xss(user._id);
        let storeid = xss(req.params.store_id)
        let comment = xss(req.body.commentInput);
        let rating = await storesData.getStoreById(storeid).rating;

        try{
            checkId(user_id)
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            checkId(storeid)
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }
        
        try{
            checkString(comment, "Newcomment");
>>>>>>> Stashed changes
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "Please enter valid comment"})
        }


        try{
<<<<<<< Updated upstream
            const newComment = await commentsforstoresData.addComment(user_id, store_id, commentInput, rating)
            res.redirect(`/${store_id}`)  
=======
            if(typeof rating !== 'number') throw 'rating has to be number'
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "Please enter valid rating"})
        }

        let newComment
        try{
            newComment = await commentsforstoresData.addComment({user_id: user_id, store_id: storeid, comment: comment, rating: rating})
            if(newComment){
            res.redirect(`/${storeid}`)  
            }
>>>>>>> Stashed changes
        }catch(e){
            return res.status(500).render('error', {title: "Error", message:"Internal Server Error"})
        }
    });
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
export default router;

function checkString(string, varName) {
    if (!string) throw `You must provide a ${varName}`;
    if (typeof string !== "string") throw `Error:${varName} must be a string`;
    string = string.trim();
    if (string.length === 0)
      throw `${varName} cannot be an empty string or just spaces`;
    return string;
}

function checkId(id) {
    if (!id) {
      throw "No id provided";
    }

    if (typeof id !== "string" || id.trim() === "") {
      throw "Invalid id provided";
    }
    id = id.trim();
    if (!ObjectId.isValid(id)) {
      throw "Not a valid ObjectId";
    }
    return id;
}