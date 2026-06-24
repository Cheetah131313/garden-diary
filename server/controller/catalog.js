
const express = require("express");
const router = express.Router();

const loadAbl = require("../abl/catalog/loadAbl");

router.get("/load", (req, res) => {
  loadAbl(req, res);
});

module.exports = router;
