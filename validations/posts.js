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
      .label('Topic'),
    new_user_id: Joi.number()
      .label('New User ID')
      .integer(),
    claimed: Joi.number()
      .label('Number of Users Who Have Saved This Idea')
      .integer()
  }
};
