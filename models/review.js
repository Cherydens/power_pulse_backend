const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { reviewParamsList } = require('../variables');

/**
 * Schema for the Review model.
 */
const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Set rating for review'],
      enum: [
        reviewParamsList.rating,
        `Review rating should be one of ${reviewParamsList.rating}`,
      ],
    },
    description: {
      type: String,
      max: [
        reviewParamsList.descriptionMaxCharacters,
        `Review description should be max ${reviewParamsList.descriptionMaxCharacters} characters.`,
      ],
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Set owner for review'],
    },
  },
  { versionKey: false, timestamps: true }
);

// Handle Mongoose save errors using a post middleware
reviewSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'review' collection using the reviewSchema.
 */
const Review = model('review', reviewSchema);

module.exports = Review;
