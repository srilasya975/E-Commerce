import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import products from "./routes/productRoutes.js";
import auth from "./routes/authRoutes.js";
import order from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoute.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use("/images", express.static("backend/images"));
app.use(cors(corsOptions));

dotenv.config({ path: path.join(__dirname, "config/.env") });

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1", order);
app.use("/api/v1/", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

connectDB();

const port = process.env.PORT;

app.listen(port, () => console.log(`server listening on port :${port}`));
