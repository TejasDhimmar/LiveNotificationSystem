'use strict';

module.exports = {
  async up(queryInterface) {
    let channelList = [
      {
        name: 'ANNOUCEMENTS',
        socket_room_name:'ANNOUCEMENTS'
      },
      {
        name: 'NODEJS LEARNING',
        socket_room_name:'NODEJS_LEARNING'
      },
      {
        name: 'NODEJS SUPPORT',
        socket_room_name:'NODEJS_SUPPORT'
      }
    ]
    return queryInterface.bulkInsert('channels', channelList);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('channels', null, {});
  }
};
