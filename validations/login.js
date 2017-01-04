'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),
    digest: Joi.string()
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
