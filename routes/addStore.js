import express from 'express';
const router = express.Router();

router.route('/').get(async (req, res) => {
    return res.json('add store page');
});

export default router;