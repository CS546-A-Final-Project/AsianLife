import express from 'express';
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

    return res.render('editstore',{title: "Edit Store"});
});

export default router;