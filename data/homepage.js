import {stores, products} from "../config/mongoCollections.js"
import { ObjectId } from 'mongodb';
import validation from '../validation.js'

export async function getStoreSearchResults(searchTerm) {
    searchTerm = validation.checkSearchValid(searchTerm);
    
    const storeCollection = await stores();
    
    const matchedStores = await storeCollection
        .find({ name: { $regex: searchTerm, $options: 'i' } })
        .limit(10)
        .toArray();
    
    const formattedStores = matchedStores.map(store => ({
        name: store.name,
        photo_id: store.photo_id, 
    }));

    return formattedStores;
}


export async function getProductSearchResults(searchTerm) {
    searchTerm = validation.checkSearchValid(searchTerm);

    const productCollection = await products();

    const matchedProducts = await productCollection
        .find({ name: { $regex: searchTerm, $options: 'i' } })
        .limit(10)
        .toArray();

    const formattedProdcuts = matchedProducts.map(product => ({
        name: product.name,
        photo_id: product.productImage
    }));

    return formattedProdcuts;
}


export async function getRecommendedStores(userId) {
    
    const storeCollection = await stores();

    const topRatedStores = await storeCollection
        .find({})
        .sort({ rating: -1 })
        .limit(5)
        .toArray();
    
    const formattedTopRatedStores = topRatedStores.map(store => ({
        name: store.name,
        photo_id: store.photo_id,
        rating: store.rating,
    }));
    
    return formattedTopRatedStores;
}

export async function getRecommendedProducts(userId) {
    const productCollection = await products();

    const topRatedProducts = await productCollection
        .find({})
        .sort({ rating: -1 })
        .limit(5)
        .toArray();

    //console.log(topRatedProducts);
    const formattedTopRatedProducts = topRatedProducts.map(product => ({
        name: product.productName,
        productImage: product.productImage,
        rating: product.rating,
    }));

    return formattedTopRatedProducts;
}