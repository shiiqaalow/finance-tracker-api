import express from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  monthlySummary,
  summary,
  updateTransaction,
} from '../controllers/transaction.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createTransactionSchema } from '../utils/zodValidation.js';
import { authorize } from '../middlewares/authorize.js';

export const trans_routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction Management APIs
 */

/**
 * @swagger
 * /transactions/create:
 *   post:
 *     summary: Create a new transaction
 *     description: Create an income or expense transaction for the authenticated user.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Grocery Shopping
 *               amount:
 *                 type: number
 *                 example: 150
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               description:
 *                 type: string
 *                 example: Weekly groceries
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
trans_routes.post(
  '/create',
  protect,
  validate(createTransactionSchema),
  authorize('admin', 'user'),
  createTransaction
);

/**
 * @swagger
 * /transactions/update/{id}:
 *   put:
 *     summary: Update a transaction
 *     description: Update an existing transaction by ID.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Internal server error.
 */
trans_routes.put(
  '/update/:id',
  protect,
  authorize('admin', 'user'),
  updateTransaction
);

/**
 * @swagger
 * /transactions/delete/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     description: Delete a transaction by ID.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Internal server error.
 */
trans_routes.delete(
  '/delete/:id',
  protect,
  authorize('admin', 'user'),
  deleteTransaction
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieve all transactions belonging to the authenticated user.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
trans_routes.get(
  '/',
  protect,
  authorize('admin', 'user'),
  getTransactions
);

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Transaction summary
 *     description: Get total transactions, total income, total expenses, and category breakdown. Admin only.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary generated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Admin access required.
 *       500:
 *         description: Internal server error.
 */
trans_routes.get(
  '/summary',
  protect,
  authorize('admin'),
  summary
);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Monthly transaction summary
 *     description: Get monthly income and expense statistics for the authenticated user.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary generated successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
trans_routes.get(
  '/monthly-summary',
  protect,
  authorize('admin', 'user'),
  monthlySummary
);