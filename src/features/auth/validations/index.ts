import Joi from 'joi';

export const registrationValidator = Joi.object({
  pseudo: Joi.string().required().message('Username is required.'),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least {{#limit}} characters long.',
    'any.required': 'Password is required.',
  }),
  repeat_password: Joi.ref('password')
});

export const loginValidator = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const forgotPasswordValidator = Joi.object({
  mail: Joi.string().email().required().messages({
    'string.email': 'Email address must be in a valid format.',
    'any.required': 'Email address is required.',
  }),
});

export const resetPasswordValisator = Joi.object({
    token: Joi.string().required(),

    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least {{#limit}} characters long.',
        'any.required': 'Password is required.',
      })
}); 

export const verifyEmailTokenValidator = Joi.object({
    token: Joi.string().required()

})