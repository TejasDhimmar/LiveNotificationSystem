module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define('channel', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        notEmpty: {
          msg: "Name is required!"
        }
      }
    },
    socket_room_name: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  });

  return User;
}