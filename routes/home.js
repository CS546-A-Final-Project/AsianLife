import express from 'express';
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import { getUser } from '../data/users.js';
import { getAllStores } from '../data/stores.js';
const router = express.Router();
import {getStoreSearchResults, getProductSearchResults, getRecommendedStores, getRecommendedProducts} from '../data/homepage.js';
import validation from '../validation.js'
import xss from 'xss';


router.route('/').get(async (req, res) => {
    const title = "Home Page";
    const id = req.session.user.id;
    const user = await getUser(id);
    const name = user.userName;

    //get recommended stores
    const topRatedStores = await getRecommendedStores(id);
    
    //get recommended products
    const topRatedProducts = await getRecommendedProducts(id);
    
    res.status(200).render('home',{
        title: title, 
        name: name,
        avatarId: user.avatar,
        recommendedStores: topRatedStores,
        recommendedProducts: topRatedProducts
    })
});


router.route('/search').post(async (req, res) => {
    const title = "Home Page";
    const id = req.session.user.id;
    const user = await getUser(id);
    const name = user.userName;
    let searchType = xss(req.body.searchType);
    let searchTerm = xss(req.body.searchTerm);

    let searchResults;
    let noResultsMessage;
    try {
        searchTerm = validation.checkSearchValid(searchTerm);
    }catch (e) {
      return res.status(400).render('error', {title: "Error", message: e.message});
    }

    if (!searchType || searchType === 'product') {
        // No specific search type selected we search product
        const matchedProducts = await getProductSearchResults(searchTerm);
        if (matchedProducts.length === 0) {
            noResultsMessage = "No products matched your search.";
        }
        else {
            searchResults = matchedProducts.map(product => ({
                ...product,
                type: 'product'
                }));
            } 
    }   else if (searchType === 'store') {
        // Search for stores 
        const matchedStores = await getStoreSearchResults(searchTerm);
        if (matchedStores.length === 0) {
            noResultsMessage = "No stores matched your search.";
        } else {
            searchResults = matchedStores.map(store => ({
                ...store,
                type: 'store'
            }));
        }
    } else {
    
        res.status(400).send('Invalid search type');
        return;
    }

    res.status(200).render('home',{
        title: title, 
        name: name,
        avatarId: user.avatar,
        searchResult: searchResults,
        noResultsMessage: noResultsMessage
    })
});


export default router;