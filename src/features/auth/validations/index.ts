import Joi from 'joi';

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
  }),
};



export const loginValidator = {
  body : Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
}
export const forgotPasswordValidator = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email address must be in a valid format.',
      'any.required': 'Email address is required.',
    }),
  })
}

export const resetPasswordValisator = {
  body: Joi.object({
    token: Joi.string().required(),

    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least {{#limit}} characters long.',
        'any.required': 'Password is required.',
      })
})
}

export const verifyEmailTokenValidator = Joi.object({
    token: Joi.string().required()

})