const express = require("express");
const router = express.Router();
const plantDao = require("../../dao/plant-dao");

function loadAbl(req, res) {
  try {
    const plants = plantDao.list();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: "Failed to load plants" });
  }
}

module.exports = loadAbl;
