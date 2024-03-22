const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const employeeRoutes = require("./Routes/employee.routes");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "DealsDray Backend",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["index.js", "./Routes/user.routes.js", "./Routes/employee.routes.js"],
};
const openapiSpecification = swaggerJsdoc(options);

const app = express();
// middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    credentials: true,
  })
);


// Routes
app.use("/user", userRoutes);
app.use("/employees", employeeRoutes);
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to DealsDray Backend!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log({ error: error.message });
  }
});
