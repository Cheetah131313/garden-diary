const express = require("express");
const router = express.Router();
const plantDao = require("../dao/plant-dao");

const GetAbl = require("../abl/plant/getAbl");
//const ListAbl = require("../abl/plant/listAbl");
const CreateAbl = require("../abl/plant/createAbl");
const UpdateAbl = require("../abl/plant/updateAbl");
const DeleteAbl = require("../abl/plant/deleteAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  try {
    const plantList = plantDao.list();
    res.json(plantList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plant list" });
  }
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

module.exports = router;
