import Joi from 'joi';

const allowedRoles = ['user', 'admin', 'moderator', 'editor', 'guest'];

export const registrationValidator = {
  body: Joi.object({
    pseudo: Joi.string().required().min(2).max(20).messages({ 
      'string.min': 'Password must be at least {{#limit}} characters long.',
      'string.max': 'Password must be at most {{#limit}} characters long.',
      'any.required': 'Username is required.'
     }),

    email: Joi.string().trim().email().required().messages({
      'string.email': 'Email address must be in a valid format.',
      'any.required': 'Email address is required.',
    }),

    password: Joi.string().required().min(6).max(20).messages({
      'string.min': 'Password must be at least {{#limit}} characters long.',
      'string.max': 'Password must be at most {{#limit}} characters long.',
      'any.required': 'Password is required.',
    }),
    
    repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Passwords must match.',
      'any.required': 'Password confirmation is required.',
    }),

    roles : Joi.string().valid(...allowedRoles).messages({
      'any.only': 'Roles value is not appropriate'
    }), 

    avatar: Joi.string()
  }),
};



export const loginValidator = {
  body : Joi.object({
    email: Joi.string().trim().email().required().messages({
      'string.email': 'Email address must be in a valid format.',
      'any.required': 'Email address is required.',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required.',
    }),
})
}
export const forgotPasswordValidator = {
  body: Joi.object({
    email: Joi.string().trim().email().required().messages({
      'string.email': 'Email address must be in a valid format.',
      'any.required': 'Email address is required.',
    }),
  })
}

export const resetPasswordValisator = {
  query: Joi.object({
    token: Joi.string().required(),

    new_password: Joi.string().required().min(6).max(20).messages({
      'string.min': 'Password must be at least {{#limit}} characters long.',
      'string.max': 'Password must be at most {{#limit}} characters long.',
      'any.required': 'Password is required.',
    }),
})
}

export const verifyEmailTokenValidator = Joi.object({
    token: Joi.string().required()

})