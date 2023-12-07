import express from 'express';
import multer from 'multer';
import { updateAvatar } from '../data/users.js'
import path from 'path';
import fs from 'fs';
const router = express.Router();

const upload = multer({
    dest: path.join(process.cwd(), '/public/images/users')
})

router.post('/', upload.single('file'), (async (req, res) => {
    console.log(req.file);
    await updateAvatar(req.session.user.id, req.file.filename);
    res.status(200).redirect('/profile');
}))
export default router;