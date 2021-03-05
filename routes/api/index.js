const router =require('express').Router();
const monsterRoutes = require('./monsters');

// Routes
router.use('/monsters', monsterRoutes);

module.exports = router;