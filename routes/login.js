import express from 'express';
import validation from '../validation.js'
import helper from '../helpers.js';
import { users } from "../config/mongoCollections.js";
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const title = "Login Page";
    res.render('login', { title: title });
  })
  .post(async (req, res) => {
    const title = "Login Page";
    const loginData = req.body;
    let errors = {};
    try {
      loginData.email = validation.checkEmail(loginData.email);
      if (!await helper.checkIfEmailExists(loginData.email)) {
        errors.email = "The email entered does not exist!";
      }
    } catch (e) {
      errors.email = e;
    }

    try {
      if(Object.keys(errors).length === 0) {
        if (!await helper.checkIfPasswordCorrect(loginData.email, loginData.password)){
          errors.password = 'Password entered is not correct';
        }
      }
    } catch (e) {
      errors.password = e;
    }

    if(Object.keys(errors).length > 0) {
      res.status(200).render('login', {errors: errors, title: title, loginData: loginData});
      return;
    }
    const userId = await helper.getUserIdByEmail(loginData.email);
    res.status(200).redirect(`/home/${userId}`);
  });


export default router;