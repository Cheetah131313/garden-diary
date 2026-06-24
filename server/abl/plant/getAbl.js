const Ajv = require("ajv");
const ajv = new Ajv();
const plantDao = require("../../dao/plant-dao.js");

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

    // read plant by given id
    const plant = plantDao.get(reqParams.id);
    if (!plant) {
      res.status(404).json({
        code: "plantNotFound",
        message: `Plant ${reqParams.id} not found`,
      });
      return;
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;
