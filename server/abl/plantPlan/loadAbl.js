const express = require("express");
const router = express.Router();
const plantPlanDao = require("../../dao/plantPlan-dao.js");

// Route to load plant plans by user ID
router.get("/load/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const plantPlans = plantPlanDao.loadByUserId(userId);
    res.json(plantPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to load plant plans now" });
  }
});

module.exports = router;
