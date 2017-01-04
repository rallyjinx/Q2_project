'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    user_id: Joi.number.integer()
      .label('User ID'),
    idea_text: Joi.string()
      .label('Idea Text')
      .min(10)
      .max(300),
    topic: Joi.string()
      .label('Topic'),
    new_user_id: Joi.number.integer()
      .label('New User ID'),
    claimed: Joi.number.integer()
      .label('Number of Users Who Have Saved This Idea')
  }
};
