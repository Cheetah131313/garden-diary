const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const plantDao = require("../../dao/plant-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    sowingTime: { type: "string" },
    harvestTime: { type: "string" },
    information: { type: "string" },
    picture: { type: "string" },
  },
  required: ["name", "sowingTime", "harvestTime", "information"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let plant = req.body;

    // validate input
    const valid = ajv.validate(schema, plant);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const plantList = plantDao.list();
    const nameExists = plantList.some((p) => p.name === plant.name);
    if (nameExists) {
      res.status(400).json({
        code: "plantAlreadyExists",
        message: `Plant with name ${plant.name} already exists`,
      });
      return;
    }

    plant = plantDao.create(plant);
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CreateAbl;
