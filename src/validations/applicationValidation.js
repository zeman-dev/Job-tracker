import { Segments, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { SOURCES, STATUSES, WORK_FORMATS } from '../constants/constants.js';

const objectIdValidator = (value, helpers) => {
  // ✅
  if (isValidObjectId(value)) {
    return value;
  }
  // ❌
  return helpers.message('Invalid id format');
};

export const applicationIdParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    applicationId: Joi.string().custom(objectIdValidator).required(),
  }),
};

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(15).trim().required(),
  role: Joi.string().max(40).allow(''),
  email: Joi.string().email().required().max(40),
});

export const getAllApplicationsSchema = {
  [Segments.QUERY]: Joi.object({
    search: Joi.string().trim().allow(''),
    source: Joi.string().valid(...SOURCES),
    workFormat: Joi.string().valid(...WORK_FORMATS),
  }),
};

export const createApplicationSchema = {
  [Segments.BODY]: Joi.object({
    status: Joi.string()
      .valid(...STATUSES)
      .trim(),
    company: Joi.string().trim().required().max(30).min(2),
    role: Joi.string().trim().required().min(5).max(40),
    notes: Joi.string().max(50).allow(''),
    source: Joi.string().valid(...SOURCES),
    jobUrl: Joi.string()
      .max(70)
      .trim()
      .allow('')
      .uri({ scheme: ['http', 'https'] }),
    workFormat: Joi.string()
      .valid(...WORK_FORMATS)
      .required(),
    city: Joi.string().allow('').max(20),
    contact: contactSchema.required(),
  }),
};

export const updateApplicationSchema = {
  [Segments.BODY]: Joi.object({
    notes: Joi.string().max(50).allow(''),
    jobUrl: Joi.string()
      .max(70)
      .trim()
      .allow('')
      .uri({ scheme: ['http', 'https'] }),
    workFormat: Joi.string().valid(...WORK_FORMATS),
    city: Joi.string().allow('').max(20),
    contact: contactSchema,
  }).min(1),
  ...applicationIdParamsSchema,
};

export const updateApplicationStatusSchema = {
  [Segments.BODY]: Joi.object(
    {
      status: Joi.string()
        .valid(...STATUSES)
        .trim()
        .required(),
    }
  ),
  ...applicationIdParamsSchema,
};
