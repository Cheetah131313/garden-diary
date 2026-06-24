const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const plantFolderPath = path.join(__dirname, "storage", "plantList");

// Method to read a plant from a file
function get(plantId) {
  try {
    const filePath = path.join(plantFolderPath, `${plantId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadPlant", message: error.message };
  }
}

// Method to write a plant to a file
function create(plant) {
  try {
    plant.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(plantFolderPath, `${plant.id}.json`);
    const fileData = JSON.stringify(plant);
    fs.writeFileSync(filePath, fileData, "utf8");
    return plant;
  } catch (error) {
    throw { code: "failedToCreatePlant", message: error.message };
  }
}

// Method to update a plant in a file
function update(plant) {
  try {
    const currentPlant = get(plant.id);
    if (!currentPlant) return null;
    const updatedPlant = { ...currentPlant, ...plant };
    const filePath = path.join(plantFolderPath, `${plant.id}.json`);
    const fileData = JSON.stringify(updatedPlant);
    fs.writeFileSync(filePath, fileData, "utf8");
    return updatedPlant;
  } catch (error) {
    throw { code: "failedToUpdatePlant", message: error.message };
  }
}

// Method to remove a plant from a file
function remove(plantId) {
  try {
    const filePath = path.join(plantFolderPath, `${plantId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovePlant", message: error.message };
  }
}

// Method to list plants in a folder
function list() {
  try {
    const files = fs.readdirSync(plantFolderPath);
    const plantList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(plantFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return plantList;
  } catch (error) {
    throw { code: "failedToListPlants", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
