const Department = require('./Department');
const Employees = require('./Employees');
const Roles = require('./Roles');


Department.hasMany(Roles, {
  foreignKey: 'department_id',
  onDelete: 'CASCADE',
});

Roles.belongsTo(Department, {
  foreignKey: 'department_id',
});

Roles.hasMany(Employees, {
  foreignKey: 'roles_id',
  onDelete: 'CASCADE',
});

Employees.belongsTo(Roles, {
  foreignKey: 'roles_id',
});

module.exports = { Department, Employees, Roles };