const express = require("express");
const ip = require("ip");
const app = express();
const config = require("./config/app");
const bodyParser = require("body-parser");
const memberRoute = require("./routes/membersRoute");
const booksRoute = require("./routes/booksRoute");
const borrowRoute = require("./routes/borrowRoute");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", memberRoute);
app.use("/api", booksRoute);
app.use("/api", borrowRoute);

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

var options = {
  explorer: true,
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.listen(config.port, () => {
  console.log(`Example app listening at http://${ip.address()}:${config.port}`);
});
