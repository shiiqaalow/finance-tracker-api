import { Transaction } from "../models/transactioin.js";
import { Category } from "../models/category.js";
// create transaction
export const createTransaction = async (req, res, next) => {
  const { title, amount, type, category } = req.body;
  const createdBy = req.user?.id;
  try {
    const categoryDoc = await Category.findById(category);

    if (!categoryDoc) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    // check if there is transaction already
    const existingTrans = await Transaction.findOne({
      title,
      amount,
      type,
      category: categoryDoc._id,
      createdBy,
    });
    if (existingTrans) {
      return res.status(401).json({ message: "Transaction already exists" });
    }
    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category: categoryDoc._id,
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
    let transactions;

    if (req.user.role === "admin") {
      transactions = await Transaction.find()
        .sort({ createdAt: -1 })
        .populate("category")
        .populate("createdBy", "name email profilePicture");
    } else {
      transactions = await Transaction.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .populate("category");
    }

    return res.status(200).json({
      success: true,
      transactions,
    });
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
  const isAdmin = req.user.role === "admin";
  try {
    let deleteTrans = null;
    if (isAdmin) {
      deleteTrans = await Transaction.findOneAndDelete({ _id: transId });
    } else {
      // find transaction to delete
      deleteTrans = await Transaction.findOneAndDelete({
        _id: transId,
        createdBy: userId,
      });
    }
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
    const pipeline = [];

    if (req.user.role !== "admin") {
      pipeline.push({
        $match: {
          createdBy: req.user._id,
        },
      });
    }

    pipeline.push(
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          totalTransaction: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },

      {
        $unwind: "$categoryInfo",
      },

      {
        $project: {
          _id: 0,
          name: "$categoryInfo.name",
          type: "$categoryInfo.type",
          totalAmount: 1,
          totalTransaction: 1,
        },
      },
    );

    const result = await Transaction.aggregate(pipeline);

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
      1,
    );

    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      1,
    );

    const pipeline = [];

    pipeline.push({
      $match: {
        date: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
    });

    if (req.user.role !== "admin") {
      pipeline.push({
        $match: {
          createdBy: req.user._id,
        },
      });
    }

    pipeline.push(
      {
        $group: {
          _id: "$category",
          totalAmount: {
            $sum: "$amount",
          },
          totalTransaction: {
            $sum: 1,
          },
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },

      {
        $unwind: "$categoryInfo",
      },

      {
        $project: {
          _id: 0,
          name: "$categoryInfo.name",
          type: "$categoryInfo.type",
          totalAmount: 1,
          totalTransaction: 1,
        },
      },
    );

    const result = await Transaction.aggregate(pipeline);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
