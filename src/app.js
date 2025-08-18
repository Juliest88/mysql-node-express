import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import errorMiddleware from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import applySecurity from "./middleware/security.js";
import router from "./routes/index.js";

const swaggerDocument = YAML.load(
  new URL("./config/swagger.yaml", import.meta.url)
);

// Init express app
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

// Apply security middleware
applySecurity(app);

// Main router
app.use("/api/v1", router);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 error
app.use(notFound);

// Error middleware
app.use(errorMiddleware);

export default app;
