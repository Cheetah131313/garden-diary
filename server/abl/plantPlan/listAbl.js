const Ajv = require("ajv");
const ajv = new Ajv();
const plantPlanDao = require("../../dao/plantPlan-dao.js");

const schema = {
  type: "object",
  properties: {},
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    // Validate input
    const valid = ajv.validate(schema, {});
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Get list of plant plans
    const plantPlanList = plantPlanDao.list();
    res.json(plantPlanList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;
