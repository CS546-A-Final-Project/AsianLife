import express from 'express';
import multer from 'multer';
import path from 'path';
import xss from 'xss';
import * as productsData from '../data/products.js';
import helpers from '../helpers.js';

const router = express.Router();

router
    .route('/')
    .put