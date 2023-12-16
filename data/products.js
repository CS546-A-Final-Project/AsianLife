import { products } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { stores } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helpers from '../helpers.js';
import xss from 'xss';


const getAllProductsByStoreId = async (store_id) => {
    store_id = helpers.checkId(store_id);
    const storesCollection = await stores();
    const productsCollection = await products();
    const store = await storesCollection.findOne({ _id: new ObjectId(store_id) });
    if (!store) {
        throw (`Store with id ${store_id} not found`);
    }
    const productIds = store.products;
    const objectIds = productIds.map(id => new ObjectId(id));

    const allProducts = await productsCollection.find({
        _id: { $in: objectIds }
    }).toArray();
    return allProducts;
};
const getProductById = async (id) => {
    id = xss(id);
    id = helpers.checkId(id, 'product_id');
    const productsCollection = await products();
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!product) {
        throw ('Product not found');
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
) => {
    user_id = helpers.checkId(user_id, 'user_id');
    store_id = helpers.checkId(store_id, 'store_id');
    productName = helpers.checkString(productName, 'productName');
    productCategory = helpers.checkCategories(productCategory, 'productCategory');
    productPrice = helpers.checkPrice(productPrice, 'productPrice');
    manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    helpers.checkDateValid(manufactureDate, expirationDate);

    let newProduct = {
        user_id: user_id,
        store_id: store_id,
        productName: productName,
        productImage: 'default.png',
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
        productReviews: [],
        productRating: 0,
        totalAmountOfReviews: 0,
    };
    const storesCollection = await stores();
    const productsCollection = await products();
    // existing same product?
    const existingProduct = await productsCollection.findOne({
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate
    });
    if (existingProduct) {
        throw ('A product with the same details already exists in the database.');
    }

    // insert new product inside 'store'
    const newInsertProductInformation = await productsCollection.insertOne(newProduct);
    if (!newInsertProductInformation.acknowledged || !newInsertProductInformation.insertedId) {
        throw (
            `New product ${newInsertProductInformation} could not be added to MongoDB`
        )
    };
    const newProductId = newInsertProductInformation.insertedId;

    // update products array      
    const updateStore = await storesCollection.findOneAndUpdate(
        { _id: new ObjectId(store_id) },
        { $push: { products: newProductId.toString() } },
        { returnDocument: 'after' }
    );
    if (!updateStore) {
        throw (`Store with ID ${store_id} could not be updated with new product`);
    }

    return newProductId.toString(); // get the new product's Id 
};
const removeProduct = async (id, store_id) => {
    id = xss(id);
    store_id = xss(store_id);
    id = helpers.checkId(id, 'product_id');
    store_id = helpers.checkId(store_id, 'store_id');
    const productsCollection = await products();
    const deletionInfo = await productsCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });

    if (!deletionInfo) {
        throw (`Could not delete product with id of ${id}`);
    }
    const storesCollection = await stores();
    const store = await storesCollection.findOne({ _id: new ObjectId(store_id) });
    if (!store) {
        throw (`Store with id ${store_id} not found`);
    }

    // remove products in store
    const updatedProductsArray = store.products.filter(productId => productId.toString() !== id);
    const updateStore = await storesCollection.updateOne(
        { _id: new ObjectId(store_id) },
        { $set: { products: updatedProductsArray } }
    );
    if (updateStore.modifiedCount === 0) {
        throw (`Could not update store with id of ${store_id}`);
    }

    return deletionInfo; // return the deleted value(object)
};
const updateProduct = async (
    id,
    productName,
    productCategory,
    productPrice,
    manufactureDate,
    expirationDate,
) => {
    id = xss(id);
    id = helpers.checkId(id, 'product_id');

    productName = helpers.checkString(productName, 'productName');
    productCategory = helpers.checkCategories(productCategory, 'productCategory');
    productPrice = helpers.checkPrice(productPrice, 'productPrice');
    manufactureDate = helpers.checkDateFormat(manufactureDate, 'manufactureDate');
    expirationDate = helpers.checkDateFormat(expirationDate, 'expirationDate');
    helpers.checkDateValid(manufactureDate, expirationDate);

    const productsCollection = await products();
    // const storesCollection = await stores();  // 获取 store collection

    // 获取现有产品信息
    const currentProduct = await productsCollection.findOne({ _id: new ObjectId(id) });
    if (!currentProduct) {
        throw (`Cannot find a product with the id ${id}.`);
    }

    // 检查产品名称是否已存在（在除此产品之外的同一商店中）
    if (productName && productName !== currentProduct.productName) {
        const existingProduct = await productsCollection.findOne({
            _id: { $ne: new ObjectId(id) },  // 排除当前产品
            productName: productName,
            store_id: currentProduct.store_id  // 与当前产品同一商店
        });
        if (existingProduct) {
            throw (`Another product with the name ${productName} already exists in the same store.`);
        }
    }

    const updateProduct = await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: "after" }
    );
    if (!updateProduct) {
        throw (`The product of ${id} could not be added successfully.`);
    }

    return updateProduct.value; // return object
};
const updateImage = async (product_id, fileName) => {
    product_id = xss(product_id);
    fileName = xss(fileName);
    product_id = helpers.checkId(product_id, 'product_id');
    fileName = helpers.checkString(fileName, 'fileName of product')
    if (!fileName) {
        fileName = "default.png";
    }
    const productsCollection = await products();
    await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(product_id) },
        {
            $set: {
                productImage: fileName,
            }
        },
        { returnDocument: 'after' }
    );
}
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
    getAllProductsByStoreId,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
    updateImage
};
