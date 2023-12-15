
// import {
//   reviewsforproductsData,
//   commentsforstoresData,
//   storesData,
//   usersData,
//   commentsData,
//   productsData,
// } from "../data/index.js";
// import { dbConnection, closeConnection } from "../config/mongoConnection.js";

import {
    reviewsforproductsData,
    reviewsforstoresData,
    storesData,
    usersData,
    commentsData,
    productsData,
} from "../data/index.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";


// const db = await dbConnection();
// await db.dropDatabase();

// <<<<<<< HEAD
// let newUser = await usersData.addUser(
//   'bobwen',
//   'Mingzhi',
//   'Wen',
//   'abc1@gmail.com',
//   'Abc123,,',
//   'admin'
// );
// let user1Id = newUser.newUserId;
// await addStore({
//   adminId: user1Id,
//   address: "address",
//   city: "Hoboken",
//   state: "NJ",
//   zipCode: "07030",
//   phoneNumber: "1234567890",
//   email: "abc1@gmail.com",
// });

// newUser = await usersData.addUser(
//   'bobwen',
//   'Mingzhi',
//   'Wen',
//   'abc2@gmail.com',
//   'Abc123,,',
//   'admin'
// );
// let user2Id = newUser.newUserId;
// await addStore({
//   adminId: user2Id,
//   address: "address",
//   city: "Hoboken",
//   state: "NJ",
//   zipCode: "07030",
//   phoneNumber: "1234567890",
//   email: "abc1@gmail.com",
// });

// newUser = await usersData.addUser(
//   'bobwen',
//   'Mingzhi',
//   'Wen',
//   'abc3@gmail.com',
//   'Abc123,,',
//   'admin'
// );
// let user3Id = newUser.newUserId;
// console.log(newUser);
// =======
// // reviewsforproducts
// console.log("-----------------------");
// console.log("addreview");
// const review1 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "1",
//   review: "This is a review",
//   rating: 5,
// });
// console.log("addreview");
// const review2 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "2",
//   review: "This is a review",
//   rating: 5,
// });

// console.log("addreview");
// const review3 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   store_id: "1",
//   review: "This is a review",
//   rating: 5,
// });

// const getAllReviews = await reviewsforproductsData.getAllReviews();
// console.log("getallreviews", getAllReviews);

// const getReviewById = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("getReviewById", getReviewById);

// const removeReview = await reviewsforproductsData.removeReview(
//   review2._id.toString()
// );
// console.log("removeReview", removeReview);
// const getAllReviews2 = await reviewsforproductsData.getAllReviews();
// console.log(getAllReviews2);

// const updateReview = await reviewsforproductsData.updateReview(
//   review1._id.toString(),
//   {
//     user_id: "1",
//     product_id: "1",
//     review: "This is a updated review",
//     rating: 1,
//   }
// );
// const getReviewById2 = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("updateReview", getReviewById2);

// console.log("-----------------------");

// // reviewsforstores
// console.log("-----------------------");
// console.log("reviewsforstores");
// console.log("addreview");
// const review4 = await reviewsforstoresData.addReview({
//   user_id: "1",
//   store_id: "1",
//   review: "This is a review",
//   rating: 5,
// });
// console.log("addreview");
// const review5 = await reviewsforstoresData.addReview({
//   user_id: "1",
//   store_id: "2",
//   review: "This is a review",
//   rating: 5,
// });
// console.log("addreview");
// const review6 = await reviewsforstoresData.addReview({
//   user_id: "1",
//   store_id: "3",
//   review: "This is a review",
//   rating: 5,
// });

// const getAllReviews3 = await reviewsforstoresData.getAllReviews();
// console.log("getallreviews", getAllReviews3);
// const getReviewById3 = await reviewsforstoresData.getReviewById(
//   review4._id.toString()
// );
// console.log("getReviewById", getReviewById3);
// const removeReview2 = await reviewsforstoresData.removeReview(
//   review5._id.toString()
// );
// console.log("removeReview", removeReview2);
// const getAllReviews4 = await reviewsforstoresData.getAllReviews();
// console.log(getAllReviews4);
// const updateReview2 = await reviewsforstoresData.updateReview(
//   review4._id.toString(),
//   {
//     user_id: "1",
//     store_id: "1",
//     review: "This is a updated review",
//     rating: 1,
//   }
// );
// const getReviewById4 = await reviewsforstoresData.getReviewById(
//   review4._id.toString()
// );
// console.log("updateReview", updateReview2);
// console.log(getReviewById4);
// console.log("-----------------------");

// // stores
// console.log("-----------------------");
// console.log("stores");
// console.log("addstore");

// const store1 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store1",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store2 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store2",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store3 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store3",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });

// const getAllStores1 = await storesData.getAllStores();
// console.log("getallstores", getAllStores1);
// const getStoreById = await storesData.getStoreById(store1._id.toString());
// console.log("getStoreById", getStoreById);
// const removeStore = await storesData.removeStore(store2._id.toString());
// console.log("removeStore", removeStore);
// const getAllStores2 = await storesData.getAllStores();
// console.log(getAllStores2);

// const updateStore = await storesData.updateStore(store1._id.toString(), {
//     admin_id: "1",
//     photo_id: "1",
//     category: "food",
//     store_name: "store1",
//     established_date: "2020-01-01",
//     store_location: "New York",
//     rating: 5,
//     products: ["1", "2"],
//     contact_information: "123-456-7890",
//     comments: ["1", "2","342"],
//     reviews: ["1", "2"],
//     });
// console.log("updateStore", updateStore);
// const getStoreById2 = await storesData.getStoreById(store1._id.toString());
// console.log(getStoreById2);
// console.log("done seeding db");

// console.log("-----------------------");

// users
// console.log("-----------------------");
// console.log("users");
// console.log("adduser");
// const user1 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "1Q@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user2 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "2Q@gmail.com",
//     gender: "Female",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user3 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });

// const getAllUsers1 = await usersData.getAllUsers();
// console.log("getallusers", getAllUsers1);
// const getUser = await usersData.getUser(user1._id.toString());
// console.log("getUser", getUser);
// const removeUser = await usersData.removeUser(user2._id.toString());
// console.log("removeUser", removeUser);
// const getAllUsers2 = await usersData.getAllUsers();

// const updateUser = await usersData.updateUser(user1._id.toString(), {
//     first_name: "Updated!!!!!!!!!!",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("updateUser", updateUser);
// const getUser2 = await usersData.getUser(user1._id.toString());
// console.log(getUser2);
// console.log(getAllUsers2);


// console.log("-----------------------");

// comments
// console.log("-----------------------");
// console.log("comments");
// console.log("addcomment");
// const comment1 = await commentsData.addComment({
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment2 = await commentsData.addComment({
//     user_id: "2",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment3 = await commentsData.addComment({
//     user_id: "3",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });

// const getAllComments1 = await commentsData.getAllComments();
// console.log("getallcomments", getAllComments1);
// const getCommentById1 = await commentsData.getCommentById(comment1._id.toString());
// console.log("getCommentById", getCommentById1);
// const removeComment = await commentsData.removeComment(comment2._id.toString());
// console.log("removeComment", removeComment);
// const getAllComments2 = await commentsData.getAllComments();
// console.log(getAllComments2);

// const updateComment = await commentsData.updateComment(comment1._id.toString(), {
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a updated comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("updateComment", updateComment);
// const getCommentById2 = await commentsData.getCommentById(comment1._id.toString());
// console.log(getCommentById2);
// console.log("-----------------------");

// products

console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log("add user!");
try {
    const user1 = await usersData.addUser(
        "yyy",
        "yaxi",
        "luo",
        "yancy@gmail.com",
        "Ci1936@Gm",
        "admin"
    )
    console.log("user1" + user1);
    // console.log(await usersData.getUser(user1._id.toString()));

console.log("add store!");
    const store1 = await storesData.addStore(
        {
            // admin_id: "65777bf7fce4b5f608b19219",
            name: "walmart",
            address: "801 Wshington St",
            city: "Hoboken",
            state: "NJ",
            zipCode: "07013",
            phoneNumber: "0123456789",
            email: "yancy@gmail.com",
            }
    )
    // console.log("storeid " + store1);

    console.log("Add product!")
    // productName,
    // productCategory,
    // productPrice,
    // manufactureDate,
    // expirationDate,
    // store_id
    const product1 = await productsData.addProduct(
        user1.user_id,
        store1,
        'AAA',
        "Fresh Produce",
        13,
        '12/06/2023',
        '12/25/2023'
    )
    const product2 = await productsData.addProduct(
        user1.user_id,
        store1,
                'hhh',
                'Dairy Products',
                4.50,
                '12/04/2023',
                '01/02/2024',
            )
            // console.log(product2);
            const product3 = await productsData.addProduct(
                user1.user_id,
                store1,
                "product3",
                'Meat and Poultry',
                100,
                '12/04/2023',
                '01/02/2024'
            );
    const product4 = await productsData.addProduct(
        user1.user_id,
        store1,
        "product4",
        "Seafood",
        45,
        "12/06/2023",
        "01/04/2024"
    )
    // const removeProduct2 = await productsData.removeProduct(product2, store1);
    // console.log("removeProduct", removeProduct2);
    const updateProduct1 = await productsData.updateProduct(
        product1,
        "product1",  
        "Fresh Produce",
        15,
    )
    // console.log(updateProduct1);
    const addReview1 = await reviewsforproductsData.addReview(
        user1.user_id,
        product1,
        store1,
        "goooooooooooooooooooooooooooooooooood",
        4
    )
    // console.log(addReview1);
    const addReview2 = await reviewsforproductsData.addReview(
        user1.user_id,
        product1,
        store1,
        "goooooooooooooooooooooooooooooooooood",
        3
    )
    const addReview3 = await reviewsforproductsData.addReview(
        user1.user_id,
        product3,
        store1,
        "goooooooooooooooooooooooooooooooooood",
        5
    )
    // const removeReview1 = await reviewsforproductsData.removeReview(addReview1._id.toString())
    // const updateReview2 = await reviewsforproductsData.updateReview(user1.user_id, addReview3._id, "", 4)
    const getAllProducts = await productsData.getAllProductsByStoreId(store1);
    // console.log(getAllProducts);
    const getAllReviews = await reviewsforproductsData.getAllReviews(product1);
        console.log("get all reviews here! They are objects!" + getAllReviews);
} catch (e) {
        console.log(e)
    }
    
//     //console.log(addReview2);
//     // const getProductById1 = await productsData.getProductById(product1._id.toString());
//     // console.log(getProductById1);
//     // const allReviewsForProduct1 = await reviewsforproductsData.getAllReviews(product1._id.toString());
//     // console.log("allReviewsForProduct1" + allReviewsForProduct1);
//     // console.log(product1.productReviews + "product1.productReviews")
//     // const removeProduct1Review = await reviewsforproductsData.removeReview(addReview1._id.toString());
//     // console.log(removeProduct1Review)
//     const updateProduct1Review = await reviewsforproductsData.updateReview(
//         "userID2_updated",
//         addReview2._id.toString(),
//         "I changed the review bulabulabula",
//         5
//     );
//     console.log(updateProduct1Review)
// } catch (e) {
//     console.log(e);
// }
// try {
//     const product4 = await productsData.addProduct(
//         "userId2",
//         "4",
//         "product4",
//         "Seafood",
//         45,
//         "12/06/2023",
//         "01/04/2024"
//     )
// } catch (e) {
//     console.log(e);
// }
// try {
//     const product2 = await productsData.addProduct(
//         "user_id2",
//         "store_id2",
//         'hhh',
//         'Dairy Products',
//         4.50,
//         '12/04/2023',
//         '01/02/2024',
//     )
//     //     //console.log(product2);
//     const product3 = await productsData.addProduct(
//         "user_id3",
//         "store_id3",
//         "product3",
//         'Meat and Poultry',
//         100,
//         '12/04/2023',
//         '01/02/2024'
//     );
//     const updateProduct = await productsData.updateProduct(
//         product2._id.toString(),
//         "product2_updated"
//     )
//     // const removeProduct2 = await productsData.removeProduct(product2._id.toString());
//     // console.log("removeProduct", removeProduct2);
//     // const getAllProducts1 = await productsData.getAllProducts();
//     //console.log(getAllProducts1);
// } catch (e) {
//     console.log(e);
// }
// try {
//     // const getProductById1 = await productsData.getProductById(product1._id.toString());
//     // console.log( getProductById1);
// } catch (e) {
//     console.log(e);
// }
// try {      
//     const removeProduct = await productsData.removeProduct(product2._id.toString());
//     console.log("removeProduct", removeProduct);
// } catch (e) {
//     console.log(e);
// }
// try {      
//     const getAllProducts2 = await productsData.getAllProducts();
//     console.log(getAllProducts2);
// } catch (e) {
//     console.log(e);
// }
// try {

// } catch (e) {
//     console.log(e);
// }




// console.log("updateProduct", updateProduct);
// const getProductById2 = await productsData.getProductById(product1._id.toString());
// console.log(getProductById2);



newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc4@gmail.com',
  'Abc123,,',
  'admin'
);
let user4Id = newUser.newUserId;
console.log(newUser);

newUser = await usersData.addUser(
  'bobwen',
  'Mingzhi',
  'Wen',
  'abc5@gmail.com',
  'Abc123,,',
  'admin'
);
let user5Id = newUser.newUserId;
console.log(newUser);
await closeConnection();
// // reviewsforproducts
// console.log("-----------------------");
// console.log("addreview");
// const review1 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "1",
//   review: "This is a review",
//   rating: 5,
// });
// console.log("addreview");
// const review2 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   product_id: "2",
//   review: "This is a review",
//   rating: 5,
// });

// console.log("addreview");
// const review3 = await reviewsforproductsData.addReview({
//   user_id: "1",
//   store_id: "1",
//   review: "This is a review",
//   rating: 5,
// });

// const getAllReviews = await reviewsforproductsData.getAllReviews();
// console.log("getallreviews", getAllReviews);

// const getReviewById = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("getReviewById", getReviewById);

// const removeReview = await reviewsforproductsData.removeReview(
//   review2._id.toString()
// );
// console.log("removeReview", removeReview);
// const getAllReviews2 = await reviewsforproductsData.getAllReviews();
// console.log(getAllReviews2);

// const updateReview = await reviewsforproductsData.updateReview(
//   review1._id.toString(),
//   {
//     user_id: "1",
//     product_id: "1",
//     review: "This is a updated review",
//     rating: 1,
//   }
// );
// const getReviewById2 = await reviewsforproductsData.getReviewById(
//   review1._id.toString()
// );
// console.log("updateReview", getReviewById2);

// console.log("-----------------------");

// // commentsforstores
// console.log("-----------------------");
// console.log("commentsforstores");
// console.log("addcomment");
// const storecomment1 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657a7edec01752ef4db69b36",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// }); 
// console.log(storecomment1)
// console.log("addcomment");
// const storecomment2 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657b24d2bd1b4f1cadcc4b25",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// });
// console.log("addcomment");
// const storecomment3 = await commentsforstoresData.addComment({
//   user_id: "657b2560bd1b4f1cadcc4b26",
//   store_id: "657b24d2bd1b4f1cadcc4b25",
//   comment: "This is a comment for store",
//   Answer:["This is answer for comment"],
//   rating: 5,
// });

// const getAllcomment1 = await commentsforstoresData.getAllComments("1");
// console.log("getallcommentsforstoreid1", getAllcomment1 );
// const getCommentById11 = await commentsforstoresData.getCommentById(
//   storecomment1._id.toString()
// );
// console.log("getCommentById", getCommentById11);
// const removeComment1 = await commentsforstoresData.removeComment(
//   storecomment2._id.toString()
// );
// console.log("removeComment", removeComment1);
// const getAllcomment2 = await commentsforstoresData.getAllComments("2");
// console.log(getAllcomment2);
// const addAnswer1 = await commentsforstoresData.addAnswer(
//   storecomment1._id.toString(), "This is answer for comment"
// );
// console.log("addAnswer", addAnswer1)
// const addAnswer2 = await commentsforstoresData.addAnswer(
//   storecomment3._id.toString(), "This is answer for comment"
// );
// console.log("addanswer", addAnswer2);
// const getAnswer = await commentsforstoresData.getAnswerById(
//   storecomment1._id.toString()
// );
// console.log("getAnswer",getAnswer);
// const deleteAnswer = await commentsforstoresData.deleteAnswer(
//   storecomment1._id.toString()
// );

// console.log("deleteAnswer", deleteAnswer);
// console.log("-----------------------");

// // stores
// console.log("-----------------------");
// console.log("stores");
// console.log("addstore");

// const store1 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store1",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store2 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store2",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });
// console.log("addstore");
// const store3 = await storesData.addStore({
//   admin_id: "1",
//   photo_id: "1",
//   category: "food",
//   store_name: "store3",
//   established_date: "2020-01-01",
//   store_location: "New York",
//   rating: 5,
//   products: ["1", "2"],
//   contact_information: "123-456-7890",
//   comments: ["1", "2"],
//   reviews: ["1", "2"],
// });

// const getAllStores1 = await storesData.getAllStores();
// console.log("getallstores", getAllStores1);
// const getStoreById = await storesData.getStoreById(store1._id.toString());
// console.log("getStoreById", getStoreById);
// const removeStore = await storesData.removeStore(store2._id.toString());
// console.log("removeStore", removeStore);
// const getAllStores2 = await storesData.getAllStores();
// console.log(getAllStores2);

// const updateStore = await storesData.updateStore(store1._id.toString(), {
//     admin_id: "1",
//     photo_id: "1",
//     category: "food",
//     store_name: "store1",
//     established_date: "2020-01-01",
//     store_location: "New York",
//     rating: 5,
//     products: ["1", "2"],
//     contact_information: "123-456-7890",
//     comments: ["1", "2","342"],
//     reviews: ["1", "2"],
//     });
// console.log("updateStore", updateStore);
// const getStoreById2 = await storesData.getStoreById(store1._id.toString());
// console.log(getStoreById2);
// console.log("done seeding db");

// console.log("-----------------------");

// // users
// console.log("-----------------------");
// console.log("users");
// console.log("adduser");
// const user1 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "1Q@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user2 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "2Q@gmail.com",
//     gender: "Female",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("adduser");
// const user3 = await usersData.addUser({
//     first_name: "FF",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });

// const getAllUsers1 = await usersData.getAllUsers();
// console.log("getallusers", getAllUsers1);
// const getUser = await usersData.getUser(user1._id.toString());
// console.log("getUser", getUser);
// const removeUser = await usersData.removeUser(user2._id.toString());
// console.log("removeUser", removeUser);
// const getAllUsers2 = await usersData.getAllUsers();

// const updateUser = await usersData.updateUser(user1._id.toString(), {
//     first_name: "Updated!!!!!!!!!!",
//     last_name: "last",
//     email: "adwad@gmail.com",
//     gender: "Male",
//     hash_password: "password",
//     city: "city",
//     state: "state",
//     age: 20,
//     users_reviews: ["1", "2"],
//     users_comments: ["1", "2"],
//     is_owner: true,
//     owned_store_id: "1",
//     });
// console.log("updateUser", updateUser);
// const getUser2 = await usersData.getUser(user1._id.toString());
// console.log(getUser2);
// console.log(getAllUsers2);


// console.log("-----------------------");

// // comments
// console.log("-----------------------");
// console.log("comments");
// console.log("addcomment");
// const comment1 = await commentsData.addComment({
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment2 = await commentsData.addComment({
//     user_id: "2",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("addcomment");
// const comment3 = await commentsData.addComment({
//     user_id: "3",
//     store_id: "1",
//     comment: "This is a comment",
//     name: "name",
//     reply: "reply",
//     });

// const getAllComments1 = await commentsData.getAllComments();
// console.log("getallcomments", getAllComments1);
// const getCommentById1 = await commentsData.getCommentById(comment1._id.toString());
// console.log("getCommentById", getCommentById1);
// const removeComment = await commentsData.removeComment(comment2._id.toString());
// console.log("removeComment", removeComment);
// const getAllComments2 = await commentsData.getAllComments();
// console.log(getAllComments2);

// const updateComment = await commentsData.updateComment(comment1._id.toString(), {
//     user_id: "1",
//     store_id: "1",
//     comment: "This is a updated comment",
//     name: "name",
//     reply: "reply",
//     });
// console.log("updateComment", updateComment);
// const getCommentById2 = await commentsData.getCommentById(comment1._id.toString());
// console.log(getCommentById2);
// console.log("-----------------------");

// // products

// console.log("-----------------------");
// console.log("products");
// console.log("addproduct");
// const product1 = await productsData.addProduct({
//     product_name: "product1",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("addproduct");
// const product2 = await productsData.addProduct({
//     product_name: "product2",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("addproduct");
// const product3 = await productsData.addProduct({
//     product_name: "product3",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
    
// const getAllProducts1 = await productsData.getAllProducts();
// console.log("getallproducts", getAllProducts1);
// const getProductById1 = await productsData.getProductById(product1._id.toString());
// console.log("getProductById", getProductById1);
// const removeProduct = await productsData.removeProduct(product2._id.toString());
// console.log("removeProduct", removeProduct);
// const getAllProducts2 = await productsData.getAllProducts();
// console.log(getAllProducts2);

// const updateProduct = await productsData.updateProduct(product1._id.toString(), {
//     product_name: "update !!!!!!product1",
//     category: "food",
//     product_price: 10,
//     posted_date: "2020-01-01",
//     store_id: "1",
//     product_reviews: ["1", "2"],
//     });
// console.log("updateProduct", updateProduct);
// const getProductById2 = await productsData.getProductById(product1._id.toString());
// console.log(getProductById2);




// await closeConnection();
