import { products } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helpers from '../helpers.js';
import xss from 'xss';

const getAllProducts = async () => {
    const productsCollection = await products();
    const allProducts = await productsCollection.find({}).toArray();
    return allProducts;
};
const getProductById = async (id) => {
    id = xss(id);
    id = helpers.checkId(id, 'product_id');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};
const addProduct = async (
    user_id,
    store_id,
    productName,
    productCategory,
    productPrice,
    manufactureDate,
    expirationDate,
 
    /*
    {
        store_id: "dlsnfmdlsalmds"
        store_name: "Walmart"
    }
    findStoreByStoreName("Walmart")
    */

) => {
    console.log("in data")
    // user_id = helpers.checkId(user_id, 'user_id');
    // store_id = helpers.checkId(store_id, 'store_id');
    productName = helpers.checkString(productName, 'productName');
    productCategory = helpers.checkCategories(productCategory, 'productCategory');
    productPrice = helpers.checkPrice(productPrice, 'productPrice');
    manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    helpers.checkDateValid(manufactureDate, expirationDate);

    let newProduct = {
        user_id: user_id,
        store_id: store_id,  //storeName: storeName
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
        productReviews: [],
        productRating: 0,
        totalAmountOfReviews: 0, // if totalAmountOfReviews = 0

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
    id = xss(id);
    id = helpers.checkId(id, 'product');
    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });
    if (deletionInfo.deletedCount === 0) {
        throw new Error(`Could not delete product with id of ${id}`);
    }
    //console.log(deletionInfo);
    return deletionInfo;
};
const updateProduct = async (
    id,
    productName,
    productCategory,
    productPrice,
    manufactureDate,
    expirationDate,
    // store_id
) => {
    id = helpers.checkId(id, 'productId');
    const productsCollection = await products();

    // iteration over product to compare if the new one is same with the rest ones.
    const existingProduct = await productsCollection.findOne({
        _id: { $ne: id },
        productName: productName
    });

    if (existingProduct) {
        throw new Error('Product name already exists');
    }
    const product = await getProductById(id);

    if (!product) {
        throw new Error(`Cannot find any object from the product ${product}, you should create one`);
    }
    // 暂不需要更新产品名称
    if (productName) {
        productName = helpers.checkString(productName, 'productName');
        product.productName = productName;
    }

    if (productCategory) {
        productCategory = helpers.checkCategories(productCategory, 'productCategory');
        product.productCategory = productCategory;
    }
    if (productPrice) {
        productPrice = helpers.checkPrice(productPrice, 'productPrice');
        product.productPrice = productPrice;
    }
    if (manufactureDate) {
        manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
        product.manufactureDate = manufactureDate;
    }
    if (expirationDate) {
        expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
        product.expirationDate = expirationDate;
    }
    if (manufactureDate && expirationDate) {
        helpers.checkDateValid(manufactureDate, expirationDate);
    }

    const updateProduct = await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnDocument: "after" }
    );
    if (!updateProduct) {
        throw new Error(`The product of ${id} could not be added successfully.`);
    }

    // productName = helpers.checkString(productName, 'productName');
    // productCategory = helpers.checkCategories(productCategory, 'productCategory');
    // productPrice = helpers.checkPrice(productPrice, 'productPrice');
    // manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    // expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    // helpers.checkDateValid(manufactureDate, expirationDate);

    // if (updatedProduct.store_id) {
    //     updatedProduct.store_id = helpers.checkId(updatedProduct.store_id, 'store_id');
    //     updatedProductData.store_id = updatedProduct.store_id;
    // }
    // if (updatedProduct.product_reviews) {
    //     updatedProductData.product_reviews = updatedProduct.product_reviews;
    // }

    // if (updatedProduct.product_image) {
    //     updatedProductData.product_image = updatedProduct.product_image;
    //     }

    // let updateCommand = {
    //     $set: updatedProductData,
    // };
    // const query = {
    //     _id: new ObjectId(id),
    // };
    // await productsCollection.updateOne(query, updateCommand);
    return await getProductById(id.toString());
};

export {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
};
