const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const plantPlanFolderPath = path.join(__dirname, "storage", "plantPlanList");

// Method to read a plant plan from a file
function get(plantPlanId) {
  try {
    const filePath = path.join(plantPlanFolderPath, `${plantPlanId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadPlantPlan", message: error.message };
  }
}

// Method to write a plant plan to a file
function create(plantPlan) {
  try {
    plantPlan.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(plantPlanFolderPath, `${plantPlan.id}.json`);
    const fileData = JSON.stringify(plantPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return plantPlan;
  } catch (error) {
    throw { code: "failedToCreatePlantPlan", message: error.message };
  }
}

// Method to update a plant plan in a file
function update(plantPlan) {
  try {
    const currentPlantPlan = get(plantPlan.id);
    if (!currentPlantPlan) return null;
    const updatedPlantPlan = { ...currentPlantPlan, ...plantPlan };
    const filePath = path.join(plantPlanFolderPath, `${plantPlan.id}.json`);
    const fileData = JSON.stringify(updatedPlantPlan);
    fs.writeFileSync(filePath, fileData, "utf8");
    return updatedPlantPlan;
  } catch (error) {
    throw { code: "failedToUpdatePlantPlan", message: error.message };
  }
}

// Method to remove a plant plan from a file
function remove(plantPlanId) {
  try {
    const filePath = path.join(plantPlanFolderPath, `${plantPlanId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovePlantPlan", message: error.message };
  }
}

// Method to list plant plans in a folder
function list() {
  try {
    const files = fs.readdirSync(plantPlanFolderPath);
    const plantPlanList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(plantPlanFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return plantPlanList;
  } catch (error) {
    throw { code: "failedToListPlantPlans", message: error.message };
  }
}

// Method to load plant plans by user ID
function loadByUserId(userId) {
  try {
    // Read all plant plans from the folder
    const files = fs.readdirSync(plantPlanFolderPath);

    // Filter plant plans by user ID
    const userPlantPlans = files
      .map((file) => {
        const filePath = path.join(plantPlanFolderPath, file);
        const fileData = fs.readFileSync(filePath, "utf8");
        const plantPlan = JSON.parse(fileData);

        // Check if the plant plan belongs to the specified user
        if (plantPlan.userId === userId) {
          return plantPlan;
        }
      })
      .filter((plantPlan) => plantPlan !== undefined); // Remove undefined values

    return userPlantPlans; // Return the filtered plant plans array
  } catch (error) {
    throw { code: "failedToLoadPlantPlans", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  loadByUserId,
};
