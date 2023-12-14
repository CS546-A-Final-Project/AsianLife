import { products } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { stores } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helpers from '../helpers.js';
import xss from 'xss';

const getAllProducts = async () => { // runs well
    const productsCollection = await products();
    const allProducts = await productsCollection.find({}).toArray();
    return allProducts;
};
const getProductById = async (id) => { // runs well
    id = xss(id);
    id = helpers.checkId(id, 'product_id');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};
const addProduct = async ( // runs well
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
    //console.log("in data")
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
    return newId.toString(); // get the new product's Id 
};
const removeProduct = async (id) => {
    id = xss(id);
    id = helpers.checkId(id, 'product_id');
    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });
    //console.log(deletionInfo);
    if (!deletionInfo) {
        throw new Error(`Could not delete product with id of ${id}`);
    }
    return deletionInfo; // return the deleted value
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

    // 获取现有产品信息，以便于与新数据进行比较
    const currentProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!currentProduct) {
        throw new Error(`Cannot find a product with the id ${id}.`);
    }

    // 检查产品名称是否已存在
    if (productName && productName !== currentProduct.productName) {
        const existingProduct = await productsCollection.findOne({
            _id: { $ne: new ObjectId(id) },
            productName: productName
        });
        if (existingProduct) {
            throw new Error(`Other product with the name ${productName} has already exists.`);
        }
    }
    
    let updateFields = {};
    // 通过检验后，更新产品名称
    if (productName) {
        productName = helpers.checkString(productName, 'productName');
        updateFields.productName = productName;
    }

    if (productCategory) {
        productCategory = helpers.checkCategories(productCategory, 'productCategory');
        updateFields.productCategory = productCategory;
    }
    if (productPrice) {
        productPrice = helpers.checkPrice(productPrice, 'productPrice');
        updateFields.productPrice = productPrice;
    }
    if (manufactureDate) {
        manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
        updateFields.manufactureDate = manufactureDate;
    }
    if (expirationDate) {
        expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
        updateFields.expirationDate = expirationDate;
    }
    if (manufactureDate && expirationDate) {
        helpers.checkDateValid(manufactureDate, expirationDate);
    }

    const updateProduct = await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: "after" }
    );
    if (!updateProduct) {
        throw new Error(`The product of ${id} could not be added successfully.`);
    }

    return updateProduct.value;
};
const bindProductWithUser = async (user_id, product_id) => {
    user_id = xss(user_id);
    product_id = xss(product_id);
    user_id = helpers.checkId(user_id);
    product_id = helpers.checkId(product_id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(user_id) });
    if (user === null) throw 'No user with that id';
    if (user.role !== 'admin') throw 'The user is not an admin'
    await userCollection.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          ownedStoreId: storeId,
        }
      },
      { returnDocument: 'after' });
    return { insertStore: true };
  }

export {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
};
