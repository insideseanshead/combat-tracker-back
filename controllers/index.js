var express = require("express");
var router = express.Router();

const monsterRoutes = require("./monsterRoutes");
const userRoutes=require('./userController')

router.get("/",(req,res)=>{
    res.send("Monster time")
});

router.use('/api/users', userRoutes)
router.use("/api/monsters", monsterRoutes)

module.exports = router