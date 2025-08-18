import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";

function applySecurity(app) {
  app.use(helmet()); // Security headers
  app.use(hpp()); // Prevent HTTP Parameter Pollution

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  // CORS
  // enabling cors for all requests by using cors middleware
  app.use(cors());
  // Enable pre-flight
  app.options("*", cors());
}

export default applySecurity;
