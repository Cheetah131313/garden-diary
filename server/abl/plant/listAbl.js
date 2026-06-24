
const plantDao = require("../../dao/plant-dao.js");

async function ListAbl(req, res) {
  try {
    const plantList = plantDao.list();
    res.json(plantList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;
