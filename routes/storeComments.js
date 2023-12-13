import express from 'express';

import { ObjectId } from "mongodb";
import { commentsforstoresData, storesData } from "../data/index.js";
const router = express.Router();


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
        const commentList = commentsforstoresData.getAllComments(storeId);
        const rating = storesData.getStoreById(storeId).rating;
        // const comment = commentsforstoresData.getCommentById(Id);
        if(user.role !== 'user') {
            isUser = false;
        }
        const answer = commentsforstoresData.getAnswerById(Id)
        res.render("storeComment", {title: storeName, commentList: commentList, answer: answer , isUser: isUser, rating:rating})
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }
    })
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
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "Please enter valid comment"})
        }


        try{
            const newComment = await commentsforstoresData.addComment(user_id, store_id, commentInput, rating)
            res.redirect(`/${store_id}`)  
        }catch(e){
            return res.status(500).render('error', {title: "Error", message:"Internal Server Error"})
        }
    });


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