const {
  DataTypes
} = require('sequelize');
const sequelize = require('../db.js'); // Import the sequelize instance

const Customer = sequelize.define('Customer', {
  // Model attributes are defined here
  customer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          is: /^[a-zA-Z ]+$/i,
      },
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      },
  },
  contact_details: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          is: /^\+91-[0-9]{10}$/i,
      },
  },
  status: {
      type: DataTypes.ENUM,
      values: ['active', 'inactive'],
      defaultValue: 'active',
  },
  created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  updated_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },


});

module.exports = Customer;