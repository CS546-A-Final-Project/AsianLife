import express from 'express';

import { ObjectId } from "mongodb";
import { commentsforstoresData, storesData } from "../data/index.js";
const router = express.Router();


router.route('/').get(async (req, res) => {

    const Id = req.params.admin_id //和佳俊对接
    
    const storeId = req.params.admin_id;

    
    try{
        checkId(storeId)
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: "no comments of this store for now"})
    }

    try{
        let isUser = true;
        const storeName = storesData.getStoreById(storeId).store_name
        const commentList = commentsforstoresData.getAllComments(storeId)
        const comment = commentsforstoresData.getCommentById(Id)
        if(!comment) isUser = false;
        const answer = commentsforstoresData.getAnswerById(Id)
        res.render("storeComment", {title: storeName, commentList: commentList, comment:comment, answer: answer , isUser: isUser})
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }
    })
    .post(async (req, res) => {
        let {_id, user_id, store_id, commentInput, rating} = req.body //和佳俊对接

        try{
            checkString(commentInput, "Newcomment");
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            checkId(_id);
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            checkId(user_id);
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            checkId(store_id);
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            if(typeof rating !== 'number') throw 'rating has to be number';
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            const storeName = storesData.getStoreById(store_id).store_name
            const commentList = commentsforstoresData.getAllComments(store_id)
            const comment = commentsforstoresData.getCommentById(_id)
            const answer = commentsforstoresData.getAnswerById(_id)

            res.render("storeComment", {title: storeName, commentList: commentList, comment:comment, answer: answer })  
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
