const config = require('../../config');
const { VK } = require('./vk');

const vk = new VK(config.VK_TOKEN);

function random(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function parseRandomPost(post) {
  const parsed = {
    text: null,
    image: null,
  }

  if (post.text) {
    parsed.text = post.text;
  } else if (post.copy_history) {
    parsed.text = post.copy_history[0].text;
  }

  return parsed;
}

async function getWallCount() {
  const count = await vk.getWallCount(config.VK_PUBLIC);
  return count;
}

async function getRandomPost(total) {
  const n = random(1, total);
  const post = await vk.getPost(config.VK_PUBLIC, n);
  return post;
}

module.exports = {
  getWallCount,
  getRandomPost,
  parseRandomPost
};