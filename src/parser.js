const { VK } = require('./modules/vk');
const config = require('../config');
const fs = require('fs');

const vk = new VK(config.VK_TOKEN);

const public = config.VK_PUBLIC;

(async () => {
  const post = await vk.getWall(public, 123);
  fs.writeFileSync('kek.json', JSON.stringify(post, null, 4));
  console.log(post);
})();

