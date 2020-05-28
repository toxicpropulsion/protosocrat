const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const { getWallCount, getRandomPost, parseRandomPost } = require('./modules/helpers');

const bot = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true });

let wallPostsCount = null;

(async () => {
  wallPostsCount = await getWallCount();
})();

bot.onText(/\/q/i, async msg => {
  const chatId = msg.chat.id;
  const post = await getRandomPost(wallPostsCount);
  const parsed = parseRandomPost(post);
  bot.sendMessage(chatId, parsed.text);
});

bot.onText(/\/update/i, async msg => {
  const chatId = msg.chat.id;
  wallPostsCount = await getWallCount();
  bot.sendMessage(chatId, `Wall posts count updated: ${wallPostsCount}`);
});
