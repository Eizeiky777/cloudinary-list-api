const express = require('express');
const multer = require('multer');
const { checkingSourceByPublicId, checkingInformationByPublicId } = require('../controller/cloudinary-controller-check-source');
const { editImage } = require('../controller/cloudinary-controller-editing');
const { uploadImageFaceDetection, checkUploadedFace } = require('../controller/cloudinary-controller-face-detection');
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

// checking image by public_id
router.get('/check_image/:public_id', checkingSourceByPublicId);
router.get('/check_image_information/:public_id', checkingInformationByPublicId);

// face detection
router.post('/upload_image_face', multering.fields([
  { name: 'images', maxCount: 3 },
  { name: 'gallery', maxCount: 3 },
]), uploadImageFaceDetection);
router.post('/check_uploaded_face', checkUploadedFace);

module.exports = router;
