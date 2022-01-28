const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employees extends Model {}

Employees.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employees',
  }
);

module.exports = Employees;