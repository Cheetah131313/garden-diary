const userDao = require("../../dao/user-dao.js");

async function ListAbl(req, res) {
  try {
    const plantPlan = userDao.list();
    res.json(plantPlan);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
