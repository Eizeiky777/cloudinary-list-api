const express = require('express');
const multer = require('multer');
const { editImage } = require('../controller/cloudinary-controller-editing');
const { uploadImage } = require('../controller/cloudinary-controller-upload');

const router = express.Router();

const multering = multer(
  {
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 },
    preservePath: true,
  },
);

// upload
router.post('/upload_image', multering.fields([
  { name: 'images', maxCount: 3 },
  { name: 'gallery', maxCount: 3 },
]), uploadImage);

// edit
router.put('/edit_image', multering.fields([
  { name: 'images', maxCount: 3 },
  { name: 'gallery', maxCount: 3 },
]), editImage);

module.exports = router;
