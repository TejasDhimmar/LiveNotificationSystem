'use strict';

module.exports = {
  async up(queryInterface) {
    let userChannelList = []

    for (let i = 2; i <= 51; i++) {
      let userChannelData = {
        user_id: i,
        channel_id: 1,
        created_at: new Date()
      }
      userChannelList.push(userChannelData);
    }

    for (let i = 2; i <= 31; i++) {
      let userChannelData = {
        user_id: i,
        channel_id: 2,
        created_at: new Date()
      }
      userChannelList.push(userChannelData);
    }

    for (let i = 32; i <= 51; i++) {
      let userChannelData = {
        user_id: i,
        channel_id: 3,
        created_at: new Date()
      }
      userChannelList.push(userChannelData);
    }
    return queryInterface.bulkInsert('user_channels', userChannelList);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('user_channels', null, {});
  }
};
