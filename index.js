const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Avoid CORS errors in browsers
app.use(express.json()); // Populate req.body
YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");
const swaggerUi = require("swagger-ui-express");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
  console.log(`API up at: http://localhost:8080`);
});
