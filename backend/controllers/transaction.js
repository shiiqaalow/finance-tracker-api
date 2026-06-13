import { Transaction } from "../models/transactioin.js";

// create transaction
export const createTransaction = async (req, res, next) => {
  const { title, amount, type, category } = req.body;
  const createdBy = req.user?.id;
  try {
    // check if there is transaction already
    const existingTrans = await Transaction.findOne({
      title,
      amount,
      type,
      category,
      createdBy,
    });
    if (existingTrans) {
      return res.status(401).json({ message: "Transaction already exists" });
    }
    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      createdBy,
    });
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};
// get transactions
export const getTransactions = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // get all transaction admin only
    let transactions = null;
    if (req.user.role === "admin") {
      transactions = await Transaction.find();
    } else {
      // get all transaction each user's transaction
      transactions = await Transaction.find({
        createdBy: userId,
      });
    }

    if (transactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found",
      });
    }

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
//update transaction
export const updateTransaction = async (req, res, next) => {
  const userId = req.user.id;
  const transId = req.params.id;
  const data = req.body;
  try {
    // find transaction to update
    const updateTrans = await Transaction.findOneAndUpdate(
      { createdBy: userId, _id: transId },
      data,
      { new: true },
    );
    if (!updateTrans) {
      return res.status(404).json({ message: "No Transaction found" });
    }
    res.status(200).json(updateTrans);
  } catch (error) {
    next(error);
  }
};
//delete transaction
export const deleteTransaction = async (req, res, next) => {
  const userId = req.user.id;
  const transId = req.params.id;
  try {
    // find transaction to delete
    const deleteTrans = await Transaction.findOneAndDelete({
      _id: transId,
      createdBy: userId,
    });
    if (!deleteTrans) {
      return res.status(404).json({ message: "No Transaction found" });
    }
    res.status(200).json({ message: "Transaction Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const summary = async (req, res, next) => {
  try {
    let result;

    if (req.user.role === "admin") {
      result = await Transaction.aggregate([
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            totalTransaction: { $sum: 1 }
          }
        }
      ]);
    } else {
      result = await Transaction.aggregate([
        {
          $match: {
            createdBy: req.user.id
          }
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            totalTransaction: { $sum: 1 }
          }
        }
      ]);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const monthlySummary = async (req, res, next) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      1
    );

    let result;

    if (req.user.role === "admin") {
      result = await Transaction.aggregate([
        {
          $match: {
            date: {
              $gte: startOfMonth,
              $lt: endOfMonth
            }
          }
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            totalTransaction: { $sum: 1 }
          }
        }
      ]);
    } else {
      result = await Transaction.aggregate([
        {
          $match: {
            createdBy: req.user._id,
            date: {
              $gte: startOfMonth,
              $lt: endOfMonth
            }
          }
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            totalTransaction: { $sum: 1 }
          }
        }
      ]);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};