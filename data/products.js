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
    productClass,
    productPrice,
    manufactureDate,
    expirationDate
) => {
    productName = helpers.checkString(productName, 'productName');
    productClass = helpers.checkClass(productClass, 'productClass');
    productPrice = helpers.checkPrice(productPrice, 'productPrice');
    let newProduct = {
        productName: productName,
        productClass: productClass,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
    };
    const productsCollection = await products();
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
