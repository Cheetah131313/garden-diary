const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const userController = require("./controller/user");
const plantController = require("./controller/plant");
const plantPlanController = require("./controller/plantPlan");
const catalogController = require("./controller/catalog");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded
app.use(cors());

// Úvodní stránka
app.get("/", (req, res) => {
  res.send("Welcome to the Gardener diary! <3");
});

//Controlers
app.use("/user", userController);
app.use("/plant", plantController);
app.use("/plantPlan", plantPlanController);
app.use("/catalog", catalogController); 

app.get("/*", (req, res) => {
  res.send("Unknown path!");
});

// Start serveru
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
