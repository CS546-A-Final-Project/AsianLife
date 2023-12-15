import { commentsforstores } from "../config/mongoCollections.js";
import validation from "../validation.js";
import { ObjectId } from "mongodb"; 
import xss from "xss";
import { storesData } from "./index.js";

const getAllComments = async (storeid) => {
  validation.checkId(storeid)
  const commentsCollection = await commentsforstores();
  const comments = await commentsCollection.find({store_id: storeid}).project({_id:1, comment:1, Answer: 1}).toArray();
  return comments;
};
// console.log(await getAllComments("657b2761bd1b4f1cadcc4b28"))
const getCommentById = async (id) => {

  validation.checkId(id);
  const commentsCollection = await commentsforstores();
  const storecomment = await commentsCollection.findOne({ _id: new ObjectId(id) })
  if (!storecomment) throw "comment cannot found";
  return storecomment;
};
// console.log(await getCommentById("657b2ab6cd44465788d395a6"))

const addComment = async (storeComment) => {
  let user_id = xss(storeComment.user_id).trim();
  let store_id = xss(storeComment.store_id).trim();
  // console.log(store_id)
  let comment = xss(storeComment.comment).trim();
  const store= await storesData.getStoreById(store_id)
  const rating = store.rating;
  // console.log(rating)
   validation.checkId(user_id);
   validation.checkId(store_id);
  validation.checkString(comment, "comment");
  

   let newstorecomment = {
      user_id: user_id,
      store_id: store_id,
      comment: comment,
      Answer:[],
      rating: rating
  }
  const commentsCollection = await commentsforstores();
  const newInsertInformation = await commentsCollection.insertOne(newstorecomment);
  if(!newInsertInformation.acknowledged || !newInsertInformation.insertedId) throw "Could not add this comment"
  const newId = newInsertInformation.insertedId;
  const userData = await storesData.updateStore(user_id)
  return await getCommentById(newId.toString());
};
 
// const newcomment = await addComment({user_id: "657b2751bd1b4f1cadcc4b27", store_id: "657b2761bd1b4f1cadcc4b28", comment: "This is a comment"})
// console.log(newcomment)
const addAnswer = async(id,  answer) => {

  validation.checkId(id);
  validation.checkString(answer, "answer");

  const comment = await getCommentById(id);
  if(comment.Answer.length !== 0 ) throw "Already answered this comment"
  
  comment.Answer.push(answer);
  const commentsCollection = await commentsforstores()
  const updateComment = {
      user_id: comment.user_id,
      store_id: comment.store_id,
      comment: comment.comment,
      Answer: comment.Answer,
      rating: comment.rating,
  }
  const updateInfo = await commentsCollection.updateOne({_id: new ObjectId(id)}, {$set: updateComment})
  if(!updateInfo.acknowledged) throw 'Could not add this answer!';

  return await getCommentById(id);
};

// console.log(await addAnswer("657b2c191f5f7e5acebdcdf2", "this is an answer"))

const getAnswerById = async(id) => {
   validation.checkId(id);
  const commentsCollection = await commentsforstores();
  const commentAnswer = await commentsCollection.find({ _id: new ObjectId(id) }).project({Answer:1}).toArray();
  if (!commentAnswer) throw "no answer from owner for now";
  return commentAnswer;
}
// console.log(await getAnswerById("657b2ab6cd44465788d395a6"))
const deleteAnswer = async(id) =>{
   validation.checkId(id);
  const commentsCollection = await commentsforstores();
  const comment = await getCommentById(id);

  const updateComment = {
      user_id: comment.user_id,
      store_id: comment.store_id,
      comment: comment.comment,
      Answer: [],
      rating: comment.rating,
  }

  const updateInfo = await commentsCollection.updateOne({_id: new ObjectId(id)}, {$set: updateComment})
  if(!updateInfo.acknowledged) throw 'Could not delete this answer!';
  return await getCommentById(id);
}
//   
const removeComment= async (id) => {

  validation.checkId(id);

  const commentsCollection = await commentsforstores();
  const deletionInfo = await commentsCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (!deletionInfo.acknowledged) {
    throw `Could not delete comment with id of ${id}`;
  }
  console.log(deletionInfo);
  return deletionInfo;
};
// console.log(await removeComment("657b2ab6cd44465788d395a6"))
export  {
  getAllComments,
  getCommentById,
  addComment,
  removeComment,
  addAnswer,
  getAnswerById,
  deleteAnswer
};
