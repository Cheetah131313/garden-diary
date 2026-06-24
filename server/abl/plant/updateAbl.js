const Ajv = require("ajv");
const ajv = new Ajv();
const plantDao = require("../../dao/plant-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    sovingTime: { type: "string" },
    harvestTime: { type: "string" },
    information: { type: "string" },
    picture: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const plant = req.body;

    // Validate input
    const valid = ajv.validate(schema, plant);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Check if the plant exists
    const existingPlant = plantDao.get(plant.id);
    if (!existingPlant) {
      res.status(404).json({
        code: "plantNotFound",
        message: `Plant with ID ${plant.id} not found`,
      });
      return;
    }

    // Update the plant
    const updatedPlant = plantDao.update(plant);
    if (!updatedPlant) {
      res.status(500).json({
        code: "failedToUpdatePlant",
        message: "Failed to update plant",
      });
      return;
    }

    res.json(updatedPlant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = UpdateAbl;
