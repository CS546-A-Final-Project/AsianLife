import { reviewsforproducts } from "../config/mongoCollections";
import { checkId } from "../validation.js";
import { ObjectId } from "mongodb";

const exportedMethods = {
    async getAllReviews() {
        const reviewsCollection = await reviewsforproducts();
        const reviews = await reviewsCollection.find({}).toArray();
        return reviews;
    },
    async getReviewById(id) {
        checkId(id);
        const reviewsCollection = await reviewsforproducts();
        const review = await reviewsCollection.findOne({ _id: ObjectId(id) });
        if (!review) throw "Review not found";
        return review;
    },
    async addReview(review) {
        const reviewsCollection = await reviewsforproducts();
        const newInsertInformation = await reviewsCollection.insertOne(review);
        const newId = newInsertInformation.insertedId;
        return await this.getReviewById(newId);
    },
    async removeReview(id) {
        const reviewsCollection = await reviewsforproducts();
        const deletionInfo = await reviewsCollection.removeOne({ _id: ObjectId(id) });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete review with id of ${id}`;
        }
    },
    async updateReview(id, updatedReview) {
        const reviewsCollection = await reviewsforproducts();
        const updatedReviewData = {};
        if (updatedReview.review) {
            updatedReviewData.review = updatedReview.review;
        }
        if (updatedReview.rating) {
            updatedReviewData.rating = updatedReview.rating;
        }
        if (updatedReview.reviewer) {
            updatedReviewData.reviewer = updatedReview.reviewer;
        }
        if (updatedReview.product) {
            updatedReviewData.product = updatedReview.product;
        }
        if (updatedReview.date) {
            updatedReviewData.date = updatedReview.date;
        }
        let updateCommand = {
            $set: updatedReviewData
        };
        const query = {
            _id: ObjectId(id)
        };
        await reviewsCollection.updateOne(query, updateCommand);
        return await this.getReviewById(id);
    }
};
