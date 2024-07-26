'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('1234', salt);
    let userList = [
      {
        name: 'Admin',
        email: 'admin@example.com',
        mobileno: '1111111111',
        password: password,
        user_type: '1',
        created_at: new Date(),
      }
    ]

    for (let i = 1; i <= 50; i++) {
      let userData = {
        name: `User${i}`,
        email: `user${i}@example.com`,
        mobileno: '1111111111',
        password: password,
        user_type: '2',
        created_at: new Date(),
      }
      userList.push(userData);
    }
    return queryInterface.bulkInsert('users', userList);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
