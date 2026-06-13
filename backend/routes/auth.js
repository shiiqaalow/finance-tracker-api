import express from 'express';
import { validate } from '../middlewares/validate.js';
import { createSigninSchema, createUserSchema } from '../utils/zodValidation.js';
import { signin, signup } from '../controllers/auth.js';
import { getCurrentUser } from '../controllers/user.js';
import { protect } from '../middlewares/auth.js';

export const auth_routes = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: ""
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *     responses:
 *       201:
 *         description: User created successfully
 */
auth_routes.post('/signup', validate(createUserSchema), signup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Login successful
 */
auth_routes.post('/signin', validate(createSigninSchema), signin);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
auth_routes.get('/me', protect, getCurrentUser);