const validateErrorMessageList = {
  'any.only': '{#key} should be one of {#valids}',
  'any.required': '{#key} is required.',

  'string.empty': '{#key} should not be an empty field.',
  'string.base': '{#key} should be a string',
  'string.pattern.base': '{#key} must be valid',
  'string.min': '{#key} must be at least {#limit} characters long',
  'string.email': 'email field must be a valid email',

  'number.base': '{#key} should be a number.',
  'number.min': '{#key} must be at least {#limit}.',

  'date.base': '{#key} should be a valid date.',
  'date.max': '{#key} cannot be in the future.',
  'date.min': '{#key} must be greater than or equal to {#limit}.',

  'object.unknown': '{#key} field is not allowed',
  'object.min': 'missing fields',

  'boolean.base': `{#key} field must be a boolean`,
};

module.exports = validateErrorMessageList;
