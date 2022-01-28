const router = require('express').Router();
const departmentRoutes = require('./departmentRoutes');

router.use('/drivers', departmentRoutes);

module.exports = router;