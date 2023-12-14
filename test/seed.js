import {
  reviewsforproductsData,
  reviewsforstoresData,
  storesData,
  usersData,
  commentsData,
  productsData,
} from "../data/index.js";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

let newUser = usersData.addUser({
  userName: 'bobwen',
  firstName: 'Mingzhi',
  lastName: 'Wen',
  email: 'wenmingzhi0@gmail.com',
  password: 'Abc123,,',
  role: 'admin'
});
console.log(newUser);

// newUser = usersData.addUser({
//   userName: 'bobwen1',
//   firstName: 'Mingzhi',
//   lastName: 'Wen',
//   email: 'wenmingzhi1@gmail.com',
//   password: 'Abc123,,',
//   role: 'admin'
// });
// console.log(newUser);

// newUser = usersData.addUser({
//   userName: 'bobwen',
//   firstName: 'Mingzhi',
//   lastName: 'Wen',
//   email: 'wenmingzhi2@gmail.com',
//   password: 'Abc123,,',
//   role: 'admin'
// });
// console.log(newUser);

// newUser = usersData.addUser({
//   userName: 'bobwen',
//   firstName: 'Mingzhi',
//   lastName: 'Wen',
//   email: 'wenmingzhi3@gmail.com',
//   password: 'Abc123,,',
//   role: 'admin'
// });
// console.log(newUser);

// newUser = usersData.addUser({
//   userName: 'bobwen',
//   firstName: 'Mingzhi',
//   lastName: 'Wen',
//   email: 'wenmingzhi4@gmail.com',
//   password: 'Abc123,,',
//   role: 'admin'
// });
console.log(newUser);
await closeConnection();
