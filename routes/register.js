import express from 'express';
import validation from '../validation.js';
import helper from '../helpers.js';
import { addUser } from '../data/register.js';
const router = express.Router();

router.route('/').get(async (req, res) => {
  const title = "Register";
  res.render('register', { title: title });
});

router.route('/').post(async (req, res) => {
  const title = "Register";
  const newUserPostData = req.body;
  let errors = {};
  try {
    newUserPostData.userName = validation.checkUserName(newUserPostData.userName, 'User Name');
  } catch (e) {
    errors.userName = e;
  }
  try {
    newUserPostData.firstName = validation.checkName(newUserPostData.firstName, 'First Name');
  } catch (e) {
    errors.firstName = e;
  }
  try {
    newUserPostData.lastName = validation.checkName(newUserPostData.lastName, 'Last Name');
  } catch (e) {
    errors.lastName = e;
  }
  try {
    newUserPostData.email = validation.checkEmail(newUserPostData.email, 'E-mail');
    if(await helper.checkIfEmailExists(newUserPostData.email)) {
      errors.email = 'The email address exists';
    }
  } catch (e) {
    errors.email = e;
  }
  try {
    newUserPostData.password = validation.checkPassword(newUserPostData.password);
  } catch (e) {
    errors.password = e;
  }
  let checked = newUserPostData.isAdmin === 'on' ? 'checked' : '';
  if (Object.keys(errors).length > 0) {
    res.render('register', {
      errors: errors,
      hasErrors: true,
      newUserPostData: newUserPostData,
      checked: checked,
    });
    return;
  }
  try {
    newUserPostData.password = helper.toHashPassword(newUserPostData.password);
    const newUser = await addUser(newUserPostData);
    res.redirect(`home/${newUser._id}`);
  } catch (e) {
    return res.status(400).render('error', { title: title, error: e });
  }

});
export default router;