var express = require("express");
var router = express.Router();

const monsterRoutes = require("./monsterRoutes");

router.get("/",(req,res)=>{
    res.send("Monster time")
});

router.use("/api/monsters", monsterRoutes)

module.exports = router