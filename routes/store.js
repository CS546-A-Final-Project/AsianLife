import express from "express";

import { ObjectId } from "mongodb";
import { storesData, productsData } from "../data/index.js";
const router = express.Router();

router.route("/:id").get(async (req, res) => {
  const storeId = req.params.id;
  const userRole = req.session.user.role;
  try {
    if (!ObjectId.isValid(storeId)) {
      throw "invalid object ID";
    }
  } catch (e) {
    return res.status(400).render("error", { error: e });
  }
  try {
    const storeProducts = await productsData.getAllProductsByStoreId(storeId);
    const store = await storesData.getStoreById(storeId);
    const user = req.session.user;
    if (storeProducts === null) throw "No storeProducts with that ID";

    res
      .status(200)
      .render("store", {
        title: store.name,
        storeProducts: storeProducts,
        storeID: storeId,
        user: user,
      });
  } catch (e) {
    return res.status(404).render("error", { error: e });
  }
});

export default router;
