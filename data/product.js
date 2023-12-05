import {users} from '../config/mongoCollections.js';
import * as helpers from '../helpers.js';

const postProduct = async (
          productName,
          productClass,
          belongingStore
) => {
          let newProduct = {
                    productName: productName,
                    productClass: productClass,
                    belongingStore: belongingStore
          };
          const usersCollection = await users();
          const insertUser = await usersCollection.insertOne(newProduct);
          //console.log(insertUser); // test
          if (!insertUser.acknowledged || !insertUser.insertedId) {
              throw new Error(`New user could not be added to MongoDB`);
          }
          return { insertedUser: true };
      };


          
