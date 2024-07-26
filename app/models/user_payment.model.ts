module.exports = (sequelize: any, Sequelize: any) => {
  const userPayment = sequelize.define('user_payment', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      notEmpty: true
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    status: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    created_at: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.DATE
    }
  }, {
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    hooks: {
      beforeCreate: async (payment: any) => {
        payment.created_at = new Date();
      }
    }
  });

  return userPayment;
}