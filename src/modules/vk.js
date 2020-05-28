const axios = require('axios');

class VK {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://api.vk.com/method/';
    this.version = '5.107';
  }

  async getWallCount(owner) {
    const { count: total } = await this.getWall(owner, 0, 1);
    return total;
  }

  async getWall(owner, offset, count = 1) {
    const url = `${this.baseUrl}wall.get?owner_id=${owner}&count=${count}&offset=${offset}&extended=0&access_token=${this.token}&v=${this.version}`;
    const { data: { response } } = await axios.get(url);
    return response;
  }

  async getPost(owner, offset) {
    const { items } = await this.getWall(owner, offset, 1);
    return items[0];
  }
}

module.exports = { VK };
