const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");

// CHECK AUTHENTICATION
const checkAuthStatus = request => {
  if (!request.headers.authorization) {
    return false;
  }
  token = request.headers.authorization.split(" ")[1];
  const loggedInUser = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, data) => {
      if (err) {
        return false;
      } else {
        return data;
      }
    }
  );
  console.log(loggedInUser);
  return loggedInUser;
};

// GET ALL ENCOUNTERS
router.get("/", (req, res) => {
  db.Encounter.findAll()
    .then((encounters) => {
      res.json(encounters);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

// GET ONE ENCOUNTER
router.get("/:id", (req, res) => {
  db.Encounter.findOne({
    where: {
      id:req.params.id,
    },
  })
    .then((dbEncounter) => {
      res.json(dbEncounter);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("something went wrong");
    });
});

// POST NEW ENCOUNTER
router.post("/", (req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("login first");
  }
  console.log(loggedInUser);
  db.Campaign.findOne({
    where: {
      id: req.body.campaignId,
    },
  }).then((campaignData) => {
    if (campaignData.UserId === loggedInUser.id) {
      db.Encounter.create({
        name: req.body.name,
        UserId: loggedInUser.id,
        CampaignId:req.body.campaignId
      })
        .then((newEncounter) => {
          return res.json(newEncounter);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("not your campaign");
        });
    } else {
        return res.status(401).send('Not your campaign')
    }
  });
});

// PUT (EDIT) ENCOUNTER
router.put("/:id",(req,res)=>{
  const loggedInUser = checkAuthStatus(req);
  if(!loggedInUser){
      return res.status(401).send('login first')
  }
  db.Encounter.findOne({
      where:{
          id:req.params.id
      }
  }).then(encounter=>{
      if(loggedInUser.id===encounter.UserId){
          db.Encounter.update({
            name: req.body.name,
            CampaignId:req.body.campaignId
          },{
              where:{
                  id:encounter.id
              }
          }).then(editEncounter =>{
              res.json(editEncounter)
          }).catch(err=>{
              console.log(err)
              res.status(500).send('something went wrong')
          })
      } else {
          return res.status(401).send("not your Encounter!")
      }
  })
})

// DELETE ENCOUNTER
router.delete("/:id",(req,res)=>{
  const loggedInUser = checkAuthStatus(req);
  if(!loggedInUser){
      return res.status(401).send('login first')
  }
  db.Encounter.findOne({
      where:{
          id:req.params.id
      }
  }).then(encounter=>{
      if(loggedInUser.id===encounter.UserId){
          db.Encounter.destroy({
              where:{
                  id:encounter.id
              }
          }).then(delEncounter =>{
              res.json(delEncounter)
          }).catch(err=>{
              console.log(err)
              res.status(500).send('something went wrong')
          })
      } else {
          return res.status(401).send("not your encounter!")
      }
  })
})

module.exports = router;
