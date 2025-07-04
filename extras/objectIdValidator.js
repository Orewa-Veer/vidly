// validator.js or wherever you keep your schemas
import Joi from "joi";

// Reusable ObjectID validator
export const objectId = () =>
  Joi.string().length(24).hex().required().messages({
    "string.length": `"{{#label}}" must be a valid ObjectID (24 hex characters)`,
    "string.hex": `"{{#label}}" must be a valid ObjectID (hexadecimal only)`,
    "any.required": `"{{#label}}" is required`,
  });
