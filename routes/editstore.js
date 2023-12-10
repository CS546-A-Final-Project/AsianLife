import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.route('/:id').get(async (req, res) => {
    const storeId = req.params.id;
    try {
        if (!ObjectId.isValid(storeId)) {
            throw 'invalid object ID';
        }
    } catch (e) {
        return res.status(400).render('error', { error: e });
    }
    console.log(storeId);
    return res.render('editstore',{title: "Edit Store", storeId: storeId});
});

export default router;