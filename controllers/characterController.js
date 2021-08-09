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

// GET ALL CHARACTERS
router.get('/', (req,res)=>{
    db.Character.findAll().then(characters=>{
        res.json(characters);
    }).catch(err=>{
        console.log(err)
        res.status(500).send('something went wrong')
    })
})

// GET CHARACTER BY ID
router.get('/:id', (req,res)=>{
    db.Character.findOne({
        where:{
            id:req.params.id
        }
    }).then(dbCharacter=>{
        res.json(dbCharacter);
    }).catch(err=>{
        console.log(err)
        res.status(500).send('something went wrong')
    })
})

// POST NEW CHARACTER
router.post('/',(req,res)=>{
    const loggedInUser = checkAuthStatus(req);
    if(!loggedInUser){
        return res.status(401).send('login first')
    }
    console.log(loggedInUser)
    db.Campaign.findOne({
        where:{
            id:req.body.campaignId
        }
    }).then(campaignData=>{
        if(campaignData.UserId===loggedInUser.id){
            db.Character.create({
                name: req.body.name,
                player: req.body.player,
                weaponSkill: req.body.weaponSkill,
                ballisticSkill: req.body.ballisticSkill,
                strength: req.body.strength,
                toughness: req.body.toughness,
                agility: req.body.agility,
                intellegence: req.body.intellegence,
                willPower: req.body.willPower,
                fellowship: req.body.fellowship,
                attacks: req.body.attacks,
                wounds: req.body.wounds,
                strengthBonus: req.body.strengthBonus,
                toughnessBonus: req.body.toughnessBonus,
                movement: req.body.movement,
                magic: req.body.magic,
                insanityPoints: req.body.insanityPoints,
                fatePoints: req.body.fatePoints,
                UserId:loggedInUser.id,
                CampaignId: req.body.campaignId
            }).then(newCharacter=>{
                return res.json(newCharacter)
            }).catch(err=>{
                console.log(err)
                return res.status(500).send('Something went wrong')
            })
        } else {
            return res.status(401).send('not your campaign')
        }
    })
})

// EDIT PUT CHARACTER INFO
router.put("/:id",(req,res)=>{
    const loggedInUser = checkAuthStatus(req);
    if(!loggedInUser){
        return res.status(401).send('login first')
    }
    db.Character.findOne({
        where:{
            id:req.params.id
        }
    }).then(character=>{
        if(loggedInUser.id===character.UserId){
            db.Character.update({
                name: req.body.name,
                player: req.body.player,
                weaponSkill: req.body.weaponSkill,
                ballisticSkill: req.body.ballisticSkill,
                strength: req.body.strength,
                toughness: req.body.toughness,
                agility: req.body.agility,
                intellegence: req.body.intellegence,
                willPower: req.body.willPower,
                fellowship: req.body.fellowship,
                attacks: req.body.attacks,
                wounds: req.body.wounds,
                strengthBonus: req.body.strengthBonus,
                toughnessBonus: req.body.toughnessBonus,
                movement: req.body.movement,
                magic: req.body.magic,
                instanityPoints: req.body.instanityPoints,
                fatePoints: req.body.fatePoints,
                CampaignId: req.body.CampaignId
            },{
                where:{
                    id:character.id
                }
            }).then(editCharacter =>{
                res.json(editCharacter)
            }).catch(err=>{
                console.log(err)
                res.status(500).send('something went wrong')
            })
        } else {
            return res.status(401).send("not your character!")
        }
    })
})

// DELETE CHARACTER
router.delete("/:id",(req,res)=>{
    const loggedInUser = checkAuthStatus(req);
    if(!loggedInUser){
        return res.status(401).send('login first')
    }
    db.Character.findOne({
        where:{
            id:req.params.id
        }
    }).then(character=>{
        if(loggedInUser.id===character.UserId){
            db.Character.destroy({
                where:{
                    id:character.id
                }
            }).then(delCharacter =>{
                res.json(delCharacter)
            }).catch(err=>{
                console.log(err)
                res.status(500).send('something went wrong')
            })
        } else {
            return res.status(401).send("not your character!")
        }
    })
})


module.exports = router