const router = require('express').Router();
let Monster = require('../../models/monster');

// Get all monsters
router.route('/').get((req, res) => {
    Monster.find()
        .then((monsters) => res.json(monsters))
        .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router;