var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require("../models");

// =========================================================================
// refactor checkAuthStatus to a utility later.
const checkAuthStatus = request => {
    if(!request.headers.authorization) {
        return false
    }
    
    token = request.headers.authorization.split(' ')[1]
    console.log(token);
    const loggedInUser = jwt.verify(token, 'secretString', (err,data) =>{
        if(err) {
            return false
        }
        else {
            return data
        }
    });
    console.log(loggedInUser)
    return loggedInUser
}
// ==========================================================================

router.get("/",(req,res)=>{
    db.Campaign.findAll().then(campaigns=>{
        res.json(campaigns);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("something went wrong")
    })
});

router.post('/',(req,res)=>{
    const loggedInUser = checkAuthStatus(req);
    if(!loggedInUser){
        return res.status(401).send('Please log in')
    }
    console.log(loggedInUser);
    db.Campaign.create({
        name:req.body.name,
        UserId:loggedInUser.id
    }).then(newCampaign=>{
        res.json(newCampaign)
    }).catch(err=>{
        console.log(err)
        res.status(500).send('something went wrong')
    })
})


module.exports = router