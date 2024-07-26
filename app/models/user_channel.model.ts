module.exports = (sequelize: any, Sequelize: any) => {
  const UserChannel = sequelize.define('user_channel', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true,
    },
    channel_id: {
      type: Sequelize.INTEGER,
      notEmpty: true,
    },
    payment_id: {
      type: Sequelize.INTEGER,
      notEmpty: true,
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE
    },
    deleted_at: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE
    }
  }, {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    hooks: {
      beforeCreate: async (user_channel:any) => {
          user_channel.created_at = new Date();
      }
    }
  });

  return UserChannel;
}