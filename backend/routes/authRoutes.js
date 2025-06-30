const express = require('express');
const { signup, login, verifyEmail } = require('../controllers/authController');
// const upload = require('../middleware/cloudinaryUpload'); // using Cloudinary now
const upload = require("../middleware/multer"); // ✅ import updated upload

const router = express.Router();

router.post('/signup', upload.single('profilePicture'), signup);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);


module.exports = router;
