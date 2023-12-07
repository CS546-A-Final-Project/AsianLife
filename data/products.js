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
    storeName // store_id
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
    // storeName = helpers.checkString(storeName, 'storeName');
    //productReviews = helpers.checkReview(productReviews, 'productReviews');
    // check review by id
    
    let newProduct = {
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        manufactureDate: manufactureDate,
        expirationDate: expirationDate,
        productReviews: [],
        productRating: 0,
        totalAmountOfReviews: 0, // if totalAmountOfReviews = 0
        store_id: store_id,
        //storeName: storeName
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
        throw `Could not delete product with id of ${id}`;
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
    storeName
) => {
    // iteration over product 

    const productsCollection = await products();
    id = helpers.checkId(id, 'productId');
    const updatedProductData = await getProductById(id);
    if (!updatedProductData) throw `Cannot find any object from the product ${product}, you should create one`;
    // if (!productName) {
    //     updatedProduct.productName = helpers.checkString(updatedProduct.productName)
    //     updatedProductData.productName = productName;
    // } 

   
    storeName = helpers.checkString(storeName, 'storeName');
    if (updatedProduct.productName) {
        updatedProduct.productName = helpers.checkString(updatedProduct.productName, 'productName');
        updatedProductData.productName = updatedProduct.productName;
    }
    if (updatedProduct.productCategory) {
        updatedProduct.productCategory = helpers.checkCategories(updatedProduct.productCategory, 'productCategory');
        updatedProductData.productCategory = updatedProduct.productCategory;
    }
    if (updatedProduct.productPrice) {
        updatedProduct.productPrice = helpers.checkPrice(updatedProduct.productPrice, 'productPrice');
        updatedProductData.productPrice = updatedProduct.productPrice;
    }
    if (updatedProduct.manufactureDate) {
        updatedProduct.manufactureDate = helpers.checkDateFormat(updatedProduct.manufactureDate, 'manufactureDate');
        updatedProductData.manufactureDate = updatedProduct.manufactureDate;
    }
    if (updatedProduct.expirationDate) {
        updatedProduct.expirationDate = helpers.checkDateFormat(updatedProduct.expirationDate, 'expirationDate');
        updatedProductData.expirationDate = updatedProduct.expirationDate;
    }
    helpers.checkDateValid(manufactureDate, expirationDate);
   
    if (updatedProduct.store_id) {
        updatedProduct.store_id = helpers.checkId(updatedProduct.store_id, 'store_id');
        updatedProductData.store_id = updatedProduct.store_id;
    }
    // if (updatedProduct.product_reviews) {
    //     updatedProductData.product_reviews = updatedProduct.product_reviews;
    // }
        
    // if (updatedProduct.product_image) {
    //     updatedProductData.product_image = updatedProduct.product_image;
    //     }
    let updateCommand = {
        $set: updatedProductData,
    };
    const query = {
        _id: new ObjectId(id),
    };
    await productsCollection.updateOne(query, updateCommand);
    return await getProductById(id.toString());
};

const getAllReviews = async () => {
    const reviewsCollection = await products();
    const reviews = await reviewsCollection.find({}).toArray();
    return reviews;
};
const getReviewById = async (id) => { // By review Id!!!
    id = helpers.checkId(id);
    const reviewsCollection = await reviewsforproducts();
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    if (!review) {
        throw new Error(`Review for ${id} not found`);
    }
    return review;
};
const addReview = async (

    user_id,
    store_id,
    productName, // string
    productReviews, // string
    rating
) => {
    user_id = helpers.checkId(user_id);
    product_id = helpers.checkId(product_id);
    store_id = helpers.checkId(store_id);
    productName = helpers.checkString(productName);
    productReviews = helpers.checkReview(productReviews);
    rating = helpers.checkRating(rating);
    let review = {
        _id: new ObjectId(),
        user_id: user_id, // user name
        // productName: productName,
        productReviews: productReviews,
        rating: rating
    }
    const reviewsCollection = await products();
    // update!!!
    const newInsertInformation = await reviewsCollection.insertOne(review);
    const newId = newInsertInformation.insertedId;
    if (!newInsertInformation.acknowledged || !newInsertInformation.insertedId) {
        throw new Error(
            `New product ${newInsertInformation} could not be added to MongoDB`
        )
    };
    // count rating and update total amount
    return await getReviewById(newId.toString());
};
const removeReview = async (id) => {
    id = helpers.checkId(id);
    const reviewsCollection = await reviewsforproducts();
    const deletionInfo = await reviewsCollection.findOneAndDelete({ _id: new ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete review with id of ${id}`;
    }
    //console.log(deletionInfo);
    return deletionInfo;
};

export {
    getAllProducts,
    getProductById,
    addProduct,
    removeProduct,
    updateProduct,
};
