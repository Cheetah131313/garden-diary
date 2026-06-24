const Ajv = require("ajv");
const ajv = new Ajv();
const plantDao = require("../../dao/plant-dao.js"); // Corrected import path

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
       const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Check if the plant exists
    const plantId = reqParams.id;
    const existingPlant = plantDao.get(plantId);
    if (!existingPlant) {
      res.status(404).json({
        code: "plantNotFound",
        message: `Plant with ID ${plantId} not found`,
      });
      return;
    }

    // Delete the plant
    plantDao.remove(plantId);

    res.json({ message: `Plant with ID ${plantId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = DeleteAbl;
