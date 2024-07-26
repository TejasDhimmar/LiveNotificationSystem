module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define('user', {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid!"
        }
      },
    },
    mobileno: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_type: {
      type: Sequelize.INTEGER,
      defaultValue: 2
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
      beforeCreate: async (user:any) => {
          user.created_at = new Date();
      }
  }
  });

  return User;
}