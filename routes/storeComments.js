import express from 'express';
import xss from "xss";
import { ObjectId } from "mongodb";
import { commentsforstoresData, storesData } from "../data/index.js";
const router = express.Router();


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
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }
    })
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
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "Please enter valid comment"})
        }


        try{
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
        }catch(e){
            return res.status(500).render('error', {title: "Error", message:"Internal Server Error"})
        }
    });

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
