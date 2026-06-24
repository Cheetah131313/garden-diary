const Ajv = require("ajv");
const ajv = new Ajv();
const plantPlanDao = require("../../dao/plantPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    plantIds: { type: "array", items: { type: "string" } },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const plantPlan = req.body;

    // Validate input
    const valid = ajv.validate(schema, plantPlan);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Check if the plant plan exists
    const existingPlantPlan = plantPlanDao.get(plantPlan.id);
    if (!existingPlantPlan) {
      res.status(404).json({
        code: "plantPlanNotFound",
        message: `Plant plan with ID ${plantPlan.id} not found`,
      });
      return;
    }

    // Update the plant plan
    const updatedPlantPlan = plantPlanDao.update(plantPlan);
    if (!updatedPlantPlan) {
      res.status(500).json({
        code: "failedToUpdatePlantPlan",
        message: "Failed to update plant plan",
      });
      return;
    }

    res.json(updatedPlantPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = UpdateAbl;
