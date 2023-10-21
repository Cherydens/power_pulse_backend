const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const notAllowedSchema = new Schema(
  {
    1: {
      type: Boolean,
    },
    2: {
      type: Boolean,
    },
    2: {
      type: Boolean,
    },
    3: {
      type: Boolean,
    },
    4: {
      type: Boolean,
    },
  },
  { versionKey: false, _id: false }
);

const productsSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    weight: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: notAllowedSchema,
    },
  },
  { versionKey: false }
);

productsSchema.post('save', handleMongooseError);

const Products = model('product', productsSchema);

module.exports = Products;
