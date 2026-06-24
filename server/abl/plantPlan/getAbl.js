const Ajv = require("ajv");
const ajv = new Ajv();
const plantPlanDao = require("../../dao/plantPlan-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Read plant plan by given id
    const plantPlan = plantPlanDao.get(reqParams.id);
    if (!plantPlan) {
      res.status(404).json({
        code: "plantPlanNotFound",
        message: `Plant plan ${reqParams.id} not found`,
      });
      return;
    }

    res.json(plantPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;
