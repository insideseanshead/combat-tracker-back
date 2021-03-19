var express = require("express");
var router = express.Router();

const monsterRoutes = require("./monsterRoutes");
const userRoutes=require('./userController')
const campaignRoutes=require('./campaignController')

router.get("/",(req,res)=>{
    res.send("Monster time")
});

router.use('/api/users', userRoutes)
router.use('/api/campaign', campaignRoutes)
router.use("/api/monsters", monsterRoutes)

module.exports = router