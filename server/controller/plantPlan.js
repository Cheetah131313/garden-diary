const express = require("express");
const router = express.Router();
const plantPlanDao = require("../../server/dao/plantPlan-dao.js");

const GetAbl = require("../abl/plantPlan/getAbl");
const ListAbl = require("../abl/plantPlan/listAbl");
const CreateAbl = require("../abl/plantPlan/createAbl");
const UpdateAbl = require("../abl/plantPlan/updateAbl");
const DeleteAbl = require("../abl/plantPlan/deleteAbl");
const LoadAbl = require("../abl/plantPlan/loadAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.get("/load/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const plantPlans = plantPlanDao.loadByUserId(userId);
    res.json(plantPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to load plant plans :(" });
  }
});

module.exports = router;
