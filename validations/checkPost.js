/* eslint no-param-reassign: 0 */
/* eslint object-shorthand: 0 */

function checkTopic(info, req) {
  const str = req.body.topic;
  if (str) {
    info.topic = req.body.topic;
  } else {
    if (!info.error.topic) {
      info.error.topic = [];
    }
    info.hasError = true;
    info.error.topic.push({ message: 'you must choose a topic' });
  }
}

function checkPostText(info, req) {
  const str = req.body.idea_text;
  let minMax = false;
  if (str.length >= 10 && str.length <= 300) {
    minMax = true;
  }
  if (minMax) {
    info.idea_text = req.body.idea_text;
  } else {
    if (!info.error.idea_text) {
      info.error.idea_text = [];
    }
    info.hasError = true;
    info.error.idea_text.push({ message: 'post must be between 10 and 300 characters' });
  }
}

module.exports = {
  checkTopic: checkTopic,
  checkPostText: checkPostText,
}
