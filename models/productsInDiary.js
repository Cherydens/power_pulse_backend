const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');

/**
 * Schema for the Product model.
 */
const productDiarySchema = new Schema(
  {
    product_ID: {
      type: Schema.Types.String,
      ref: 'product',
      required: [true, 'ID is required'],
    },
    date: {
      type: String,
      default: '',
      required: true,
    },
    amount: {
      type: Number,
      default: null,
      required: true,
    },
    calories: {
      type: Number,
      default: '',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
productDiarySchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'product' collection using the userSchema.
 */
const ProductsDiary = model('productDiary', productDiarySchema);

module.exports = ProductsDiary;
