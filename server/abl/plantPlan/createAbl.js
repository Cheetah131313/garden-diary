const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const plantPlanDao = require("../../dao/plantPlan-dao.js"); 

const schema = {
  type: "object",
  properties: {
    userId: { type: "string" },
    plantIds: { type: "array", items: { type: "string" } },
  },
  required: ["userId", "plantIds"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    const { userId, plantIds } = req.body;

    // Validate input
    const valid = ajv.validate(schema, { userId, plantIds });
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Create the plant plan
    const newPlantPlan = plantPlanDao.create({ userId, plantIds });

    res.status(201).json(newPlantPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CreateAbl;
