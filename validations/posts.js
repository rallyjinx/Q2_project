'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    user_id: Joi.number()
      .label('User ID')
      .integer(),
    idea_text: Joi.string()
      .label('Idea Text')
      .min(10)
      .max(300),
    topic: Joi.string()
      .label('Topic')
  }
};
