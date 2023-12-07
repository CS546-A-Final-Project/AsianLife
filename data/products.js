import { products } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helpers from '../helpers.js';

const getAllProducts = async () => {
    const productsCollection = await products();
    const allProducts = await productsCollection.find({}).toArray();
    return allProducts;
};
const getProductById = async id => {
    id = helpers.checkId(id, 'product');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) throw new Error('Product not found');
    return product;
};
const addProduct = async (
    productName,
    productCategory,
    productPrice,
    manufactureDate,
    expirationDate,
    productReviews,
    store_name //store name 
    /*
    {
        store_id: "dlsnfmdlsalmds"
        store_name: "Walmart"
    }
    findStoreByStoreName("Walmart")
    */

) => {
    productName = helpers.checkString(productName, 'productName');
    productCategory = helpers.checkCategories(productCategory, 'productCategory');
    productPrice = helpers.checkPrice(productPrice, 'productPrice');
    manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    helpers.checkDateValid(manufactureDate, expirationDate);
    productReviews = helpers.checkReview(productReviews, 'productReviews');
    //store_name = 
    let newProduct = {
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
        productReviews: [],
        store_name: store_name
    };
    const productsCollection = await products();
    // const store = getStoreByStoreName()
    // insert new product inside 'store'
    const newInsertInformation = await productsCollection.insertOne(newProduct);
    if (!newInsertInformation.acknowledged || !newInsertInformation.insertedId) {
        throw new Error(
            `New product ${newInsertInformation} could not be added to MongoDB`
        )
    };
    const newId = newInsertInformation.insertedId;
    return await getProductById(newId.toString());
};
const removeProduct = async (id) => {
    id = helpers.checkId(id, 'product');
    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete product with id of ${id}`;
    }
    //console.log(deletionInfo);
    return deletionInfo;
};
const updateProduct = async (id, updatedProduct) => {
    id = helpers.checkId(id, 'product');
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
export {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
};
