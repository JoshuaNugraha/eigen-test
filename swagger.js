const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "192.168.185.173:5063",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsfiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsfiles, doc).then(() => {
  require("./app.js");
});
