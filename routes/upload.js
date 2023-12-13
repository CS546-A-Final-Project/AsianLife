import express from "express";
import multer from "multer";
import { updateAvatar } from "../data/users.js";
import { ObjectId } from "mongodb";
import { updateImage, updateStore} from "../data/stores.js";
import path from "path";
import fs from "fs";
const router = express.Router();

const upload = multer({
  dest: path.join(process.cwd(), "/public/images/users"),
});

router.post("/", upload.single("file"), async (req, res) => {
  //console.log(req.file);
  await updateAvatar(req.session.user.id, req.file.filename);
  res.status(200).redirect("/profile");
});

const uploadStore = multer({
  dest: path.join(process.cwd(), "/public/images/stores"),
});

router.post("/store/:id", uploadStore.single("file"), async (req, res) => {
  console.log(req.file);
  if(req.file) {
    await updateImage(req.params.id, req.file.filename);
  }const store_name = req.body.store_name;
  const streetAddress = req.body.streetAddress;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const email = req.body.email;
  const phone = req.body.phone;

  const store_location = {
    streetAddress: streetAddress,
    city: city,
    state: state,
    zip: zip,
  };
    const contact_information = {
        email: email,
        phone: phone,
    };
  await updateStore(req.params.id, {
    store_name: store_name,
    store_location: store_location,
    contact_information: contact_information,
  });
  res.status(200).redirect("/editstore/" + req.params.id);
});
export default router;
