const router = require('express').Router();
const { Department, Roles, Employees } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const departmentData = await Department.findAll({
      include: [{ model: Roles }, { model: Employees }],
    });
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const departmentData = await Department.findByPk(req.params.id, {
      include: [{ model: Roles }, { model: Employees }],
    });

    if (!departmentData) {
      res.status(404).json({ message: 'No department found with that id!' });
      return;
    }

    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
