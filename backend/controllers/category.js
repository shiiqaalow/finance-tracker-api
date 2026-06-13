import { Category } from "../models/category.js";

// create category
export const createCategory = async (req, res, next) => {
  const { name, type } = req.body;
  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(401).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name, type });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// get categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// update category
export const updateCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const data = req.body;
  try {
    const updateCat = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
    });
    if (!updateCat) {
      return res.status(404).json({ message: "No Category found" });
    }
    res.status(200).json(updateCat);
  } catch (error) {
    next(error);
  }
};

// delete category
export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const deleteCat = await Category.findByIdAndDelete(categoryId);
    if (!deleteCat) {
      return res.status(404).json({ message: "No Category found" });
    }
    res.status(200).json({ message: "Category Successfully deleted" });
  } catch (error) {
    next(error);
  }
};