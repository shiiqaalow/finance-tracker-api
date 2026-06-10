import express from 'express';
import { protect } from '../middlewares/auth.js';
import { uploadFile } from '../controllers/upload.js';
import { upload } from '../middlewares/upload.js';

export const upload_router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File Upload APIs
 */

/**
 * @swagger
 * /upload/profile:
 *   post:
 *     summary: Upload profile picture
 *     description: Upload a profile image to Cloudinary and save its URL to the authenticated user's profile.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Profile image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile picture uploaded successfully.
 *                 fileUrl:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/v123456/profile.jpg
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

upload_router.post(
  '/profile',
  protect,
  upload.single('file'),
  uploadFile
);