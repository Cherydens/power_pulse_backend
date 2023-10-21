const validateErrorMessageList = {
  'string.empty': `{#key} should not be an empty field.`,
  'any.required': `{#key} is required.`,
  'string.base': `{#key} should be a string`,
  'string.min': '{#key} must be at least {#limit} characters long',
  'string.pattern.base': `{#key} must be valid`,

  'string.email': 'email field must be a valid email',
  'boolean.base': `{#key} field must be a boolean`,
  'object.unknown': `{#key} field is not allowed`,
  'object.min': 'missing fields',
  'any.only': '{#key} must be one of {#valids}',
};

module.exports = validateErrorMessageList;
