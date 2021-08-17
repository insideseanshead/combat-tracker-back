var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");

// CHECK AUTHENTICATION
const checkAuthStatus = (request) => {
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

// GET ALL CAMPAIGNS
router.get("/", (req, res) => {
  db.Campaign.findAll({
    include: [db.Encounter],
    include: [db.Character]
  })
    .then((campaigns) => {
      res.json(campaigns);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// GET ONE CAMPAIGN
router.get(`/:id`, (req, res) => {
  db.Campaign.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Encounter],
  })
    .then((dbCampaign) => {
      res.json(dbCampaign);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("something went wrong");
    });
});

// POST NEW CAMPAIGN
router.post("/", (req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("Please log in");
  }
  console.log(loggedInUser);
  db.Campaign.create({
    name: req.body.name,
    UserId: loggedInUser.id,
  })
    .then((newCampaign) => {
      res.json(newCampaign);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("something went wrong");
    });
});

// PUT CAMPAIGN (UPDATE)
router.put("/:id", (req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("login first");
  }
  db.Campaign.findOne({
    where: {
      id: req.params.id,
    },
  }).then((campaign) => {
    if (loggedInUser.id === campaign.UserId) {
      db.Campaign.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: campaign.id,
          },
        }
      )
        .then((editCampaign) => {
          res.json(editCampaign);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("something went wrong");
        });
    } else {
      return res.status(401).send("not your Campaign!");
    }
  });
});

// DELETE CAMPAIGN
router.delete("/:id", (req, res) => {
  const loggedInUser = checkAuthStatus(req);
  if (!loggedInUser) {
    return res.status(401).send("login first");
  }
  db.Campaign.findOne({
    where: {
      id: req.params.id,
    },
  }).then((campaign) => {
    if (loggedInUser.id === campaign.UserId) {
      db.Campaign.destroy({
        where: {
          id: campaign.id,
        },
      })
        .then((delCampaign) => {
          res.json(delCampaign);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("something went wrong");
        });
    } else {
      return res.status(401).send("not your Campaign!");
    }
  });
});

module.exports = router;
