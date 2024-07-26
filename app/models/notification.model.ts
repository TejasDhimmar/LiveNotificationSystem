module.exports = (sequelize: any, Sequelize: any) => {
  const Notification = sequelize.define('notification', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    channel_id: {
      type: Sequelize.INTEGER,
      allowNull: false
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
      beforeCreate: async (notfication:any) => {
          notfication.created_at = new Date();
      }
  }
  });

  return Notification;
}