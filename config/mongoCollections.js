import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// Note: You will need to change the code below to have the collection required by the assignment!
export const users = getCollectionFn('users');
export const stores = getCollectionFn('stores');
export const products = getCollectionFn('product');
export const comments = getCollectionFn('comments');
export const reviewsforstores = getCollectionFn('reviewsforstores');
export const reviewsforproducts = getCollectionFn('reviewsforproducts');
