const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

const emails = [{"createdAt": "1999-12-31-00-00-00", "Name": "String", "content": "String"}]

app.use(cors());
app.use(bodyParser.json());
app.use(cors()); // Avoid CORS errors in browsers
app.use(express.json()); // Populate req.body
YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");
const swaggerUi = require("swagger-ui-express");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/emails',  (req, res) => {
    res.send(emails);
})
app.get("/", (req, res) => {
  res.send("Welcome from backend");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
