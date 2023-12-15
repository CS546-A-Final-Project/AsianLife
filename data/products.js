import { products } from '../config/mongoCollections.js';
import { users } from '../config/mongoCollections.js';
import { stores } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helpers from '../helpers.js';
import xss from 'xss';

// const getAllProducts = async () => {
//     const productsCollection = await products();
//     const allProducts = await productsCollection.find({}).toArray();
//     return allProducts;
//   };

const getAllProductsByStoreId = async (store_id) => {
    const storesCollection = await stores();
    const productsCollection = await products();
    const store = await storesCollection.findOne({ _id: store_id });
    if (!store) {
        throw new Error(`Store with id ${store_id} not found`);
    }
    const productIds = store.products;
    const allProducts = await productsCollection.find({
        _id: { $in: productIds }
    }).toArray();

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
        store_id: store_id,  // storeName: storeName
        productName: productName,
        productImage: 'default.png',
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
        productReviews: [],
        productRating: 0,
        totalAmountOfReviews: 0, // if totalAmountOfReviews = 0
    };
    const storesCollection = await stores();
    const productsCollection = await products();

    // insert new product inside 'store'
    const newInsertProductInformation = await productsCollection.insertOne(newProduct);
    if (!newInsertProductInformation.acknowledged || !newInsertProductInformation.insertedId) {
        throw new Error(
            `New product ${newInsertProductInformation} could not be added to MongoDB`
        )
    };
    const newProductId = newInsertProductInformation.insertedId;
    // update products array      
    const updateStore = await storesCollection.findOneAndUpdate(
        { _id: new ObjectId(store_id) }, // use store_id
        { $push: { products: newProductId.toString() } }, // use $push to add
        { returnDocument: 'after' } // 可选，如果你想获取更新后的文档
    );

    if (!updateStore) {
        throw new Error(`Store with ID ${store_id} could not be updated with new product`);
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
    //console.log(deletionInfo);
    if (!deletionInfo) {
        throw new Error(`Could not delete product with id of ${id}`);
    }
    const storesCollection = await stores();
    const store = await storesCollection.findOne({ _id: new ObjectId(store_id)});
    if (!store) {
        throw new Error(`Store with id ${store_id} not found`);
    }
    // 使用 filter 方法移除产品ID
    const updatedProductsArray = store.products.filter(productId => productId.toString() !== id);

    // 更新商店文档的 products 数组
    const updateStore = await storesCollection.updateOne(
        { _id: new ObjectId(store_id) },
        { $set: { products: updatedProductsArray } }
    );

    if (updateStore.modifiedCount === 0) {
        throw new Error(`Could not update store with id of ${store_id}`);
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
) => {
    id = xss(id);
    id = helpers.checkId(id, 'product_id');

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
const updateImage = async (id, fileName) => {
    const productsCollection = await products();
    await productsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
            $set: {
                productImage: fileName,
            }
        },
        { returnDocument: 'after' });
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
    // getAllProducts,
    getAllProductsByStoreId,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
    updateImage
};
