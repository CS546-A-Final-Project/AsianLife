import express from 'express';
import { ObjectId } from "mongodb";
import { commentsforstoresData } from "../data/index.js";
const router = express.Router();


router.route('/:id').get(async (req, res) => {
    let user = req.session.user//和佳俊对接
    let storeId = req.params.id
    let isAdmin = true;
    // let isCommentuser = true; ---how
    if(user.role !== 'admin') {
      isAdmin = false;
    }
    res.render("/commentDetail", {comment: comment, answer: answer, isAdmin: isAdmin})
    })
    .post(async (req, res) => {
        // let {_id, user_id, store_id, comment, answer, answerInput} = req.body //和佳俊对接
        let user = req.session.user;
        let id = req.params.id
        // let rating = storesData.getStoreById(store_id).rating;
        // let storeName = storesData.getStoreById(store_id).name;
        let answerInput = req.body.answerInput;
        // let isUser = true;
        // let isAdmin = true;
        // if(req.body.user_id !== 'admin') isAdmin = false;

        try{
            checkString(answerInput,"answer");
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "please enter valid answer"})
        }

        try{
            const newAnswer = await commentsforstoresData.addAnswer(id, answerInput)
            res.redirect(`/${id}`)
        }catch(e){
            return res.status(500).render('error', {title: "Error", message:"Internal Server Error"})
        }
      })
      .update(async (req, res) => {
          // let {_id, user_id, store_id, comment, answer, answerInput} = req.body //和佳俊对接
          let user = req.session.user;
          let id = req.params.id
          // let rating = storesData.getStoreById(store_id).rating;
          // let storeName = storesData.getStoreById(store_id).name;
          
          // let isUser = true;
          // let isAdmin = true;
          // if(req.body.user_id !== 'admin') isAdmin = false;
  
          try{
              const newAnswer = await commentsforstoresData.deleteAnswer(id)
              res.redirect(`/${id}`)
          }catch(e){
              return res.status(500).render('error', {title: "Error", message:"cannot delete this answer"})
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