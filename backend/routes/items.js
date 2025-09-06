const express = require('express');
const { body } = require('express-validator');
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  toggleFavorite,
  getMyItems
} = require('../controllers/itemController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Validation rules for item creation/update
const itemValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['electronics', 'furniture', 'clothing', 'books', 'sports', 'home', 'other'])
    .withMessage('Please select a valid category'),
  body('condition')
    .isIn(['excellent', 'good', 'fair', 'poor'])
    .withMessage('Please select a valid condition'),
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('location.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('location.state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
];

// Public routes
router.get('/', getItems);
router.get('/:id', getItem);

// Protected routes
router.use(protect);
router.get('/user/my-items', getMyItems);
router.post('/', itemValidation, createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.post('/:id/favorite', toggleFavorite);

module.exports = router;
