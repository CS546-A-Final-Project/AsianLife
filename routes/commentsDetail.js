import express from 'express';
import { ObjectId } from "mongodb";
import { commentsforstoresData } from "../data/index.js";
const router = express.Router();


router.route('/').get(async (req, res) => {
    let user = req.session.user//和佳俊对接
    let isAdmin = true;
    if(req.body.user_id !== 'admin') isAdmin = false;
    res.render("/commentDetail", {comment: comment, answer: answer, isAdmin: isAdmin})
    })
    .post(async (req, res) => {
        let {_id, user_id, store_id, comment, answer, answerInput} = req.body //和佳俊对接
        let isAdmin = true;
        if(req.body.user_id !== 'admin') isAdmin = false;

        try{
            checkString(answerInput,"answer");
        }catch(e){
            return res.status(400).render('error', {title: "Error", message: e})
        }

        try{
            const newAnswer = await commentsforstoresData.addAnswer(_id, answerInput)
            res.render("/commentDetail", {comment: newAnswer.comment, answer: newAnswer.answer, isAdmin: isAdmin},)
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