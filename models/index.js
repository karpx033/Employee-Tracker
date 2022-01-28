const Department = require('./Department');
const Employees = require('./Employees');
const Roles = require('./Roles');

Driver.hasMany(Roles, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE',
});

Roles.belongsTo(Driver, {
  foreignKey: 'driver_id',
});

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
Roles.hasMany(Employees, {
  foreignKey: 'roles_id',
  onDelete: 'CASCADE',
});

// The association can also be created from the Car side
Employees.belongsTo(Roles, {
  foreignKey: 'roles_id',
});

module.exports = { Department, Employees, Roles };