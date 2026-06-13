import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/category.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

export const category_routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category Management APIs
 */

/**
 * @swagger
 * /categories/create:
 *   post:
 *     summary: Create a new category
 *     description: Create a new income or expense category. Admin only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: ""
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: ""
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       401:
 *         description: Category already exists or unauthorized.
 *       500:
 *         description: Internal server error.
 */
category_routes.post(
  '/create',
  protect,
  authorize('admin'),
  createCategory
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No categories found.
 *       500:
 *         description: Internal server error.
 */
category_routes.get(
  '/',
  protect,
  authorize('admin', 'user'),
  getCategories
);

/**
 * @swagger
 * /categories/update/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update an existing category by ID. Admin only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: ""
 *                 enum: [income, expense]
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
category_routes.put(
  '/update/:id',
  protect,
  authorize('admin'),
  updateCategory
);

/**
 * @swagger
 * /categories/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category by ID. Admin only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
category_routes.delete(
  '/delete/:id',
  protect,
  authorize('admin'),
  deleteCategory
);