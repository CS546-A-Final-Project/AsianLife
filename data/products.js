import { products } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

const getAllProducts = async () => {
  const productsCollection = await products();
  const allProducts = await productsCollection.find({}).toArray();
  return allProducts;
};

const getProductById = async (id) => {
  const productsCollection = await products();
  const product = await productsCollection.findOne({ _id: new ObjectId(id) });
  if (!product) throw "Product not found";
  return product;
};
const addProduct = async (product) => {
  const productsCollection = await products();
  const newInsertInformation = await productsCollection.insertOne(product);
  const newId = newInsertInformation.insertedId;
  return await getProductById(newId.toString());
};
const removeProduct = async (id) => {
  const productsCollection = await products();
  const deletionInfo = await productsCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete product with id of ${id}`;
  }
  console.log(deletionInfo);
  return deletionInfo;
};
const updateProduct = async (id, updatedProduct) => {
  const productsCollection = await products();
  const updatedProductData = {};
  if (updatedProduct.product_name) {
    updatedProductData.product_name = updatedProduct.product_name;
  }
  if (updatedProduct.category) {
    updatedProductData.category = updatedProduct.category;
  }
  if (updatedProduct.product_price) {
    updatedProductData.product_price = updatedProduct.product_price;
  }
  if (updatedProduct.posted_date) {
    updatedProductData.posted_date = updatedProduct.posted_date;
  }
  if (updatedProduct.store_id) {
    updatedProductData.store_id = updatedProduct.store_id;
  }
  if (updatedProduct.product_reviews) {
    updatedProductData.product_reviews = updatedProduct.product_reviews;
  }
  if (updatedProduct.product_image) {
    updatedProductData.product_image = updatedProduct.product_image;
  }
  let updateCommand = {
    $set: updatedProductData,
  };
  const query = {
    _id: new ObjectId(id),
  };
  await productsCollection.updateOne(query, updateCommand);
  return await getProductById(id.toString());
};
const updateImage = async (id, updatedProduct) => {
  const productsCollection = await products();
  await productsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        product_image: updatedProduct.product_image,
      },
    },
    { returnDocument: "after" }
  );
};
export {
  getAllProducts,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
  updateImage,
};
