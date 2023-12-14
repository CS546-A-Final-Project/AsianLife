import express from 'express';
import xss from 'xss'
import { ObjectId } from "mongodb";
import { commentsforstoresData, storesData } from "../data/index.js";
const router = express.Router();


router.route('/:comment_id').get(async (req, res) => {

    let ownedStoreid = req.session.user.ownedStoreId
    let commentId = xss(req.params.comment_id);
    let comment = await commentsforstoresData.getCommentById(commentId);
    let storeid = comment.store_id;
   
    let isAdmin = true;
    if(ownedStoreid !== storeid) {
      isAdmin = false;
    }

    try{
      checkId(commentId)
    }catch(e){
      return res.status(400).render('error', {title: "Error", message: e})
    }

    try{
        let commentData = await commentsforstoresData.getCommentById(commentId);
        // console.log(commentData)
        let comment = commentData.comment;
        let answer = commentData.Answer[0];
        res.render("commentsDetail", {comment: comment, answer: answer, isAdmin: isAdmin, commentId: commentId})
    }catch(e){
        return res.status(400).render('error', {title: "Error", message: e})
    }
  })
    .post(async (req, res) => {
    

        let answerInput = xss(req.body.answerInput);
        // console.log(answerInput);
        let commentId = xss(req.params.comment_id);
        // console.log(commentId)

        try{
          checkId(commentId)
        }catch(e){
          return res.status(400).render('error', {title: "Error", message: e})
        }
    
        try{
            checkString(answerInput,"answer");
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: "please enter valid answer"})
        }

        try{
            const newAnswer = await commentsforstoresData.addAnswer(commentId, answerInput)
            res.redirect(`/commentsDetail/${commentId}`)
        }catch(e){
            return res.status(500).render('error', {title: "Error", error:"Internal Server Error"})
        }
      })
    //   .put(async (req, res) => {
          
    //       let user = req.session.user;
    //       let userId = user._id;

          
  
    //       try{
    //           const newAnswer = await commentsforstoresData.deleteAnswer(id)
    //           res.redirect(`/${id}`)
    //       }catch(e){
    //           return res.status(500).render('error', {title: "Error", message:"cannot delete this answer"})
    //       }
    // });
 
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