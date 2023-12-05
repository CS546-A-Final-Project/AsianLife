import express from 'express';
const router = express.Router();

router.route('/').get(async (req, res) => {
    return res.json('change password page');
});

export default router;