import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import orderRoute from "./routes/orderRoutes.js";
import userRoute from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 9002;

app.use(express.json());
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Getting Started" });
});

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
