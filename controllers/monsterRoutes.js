const express = require('express');
const router = express.Router();
const db = require('../models')

// Get All Monsters
router.get("/", (req, res) => {
    db.Monster.findAll()
        .then((monsters) => {
            res.json(monsters);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end()
        })
})

module.exports = router;