const express = require("express");
const app = express();

require("./Startup/db")();
require("./Startup/routes")(app);

app.get("/", (req, res) => {
  console.log("Server-Health : OKAY");

  res.status(200).send('AgriGrowth Backend: Successfully Up & Running');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server-Started at PORT : ${PORT}`);
});

module.exports = server;
