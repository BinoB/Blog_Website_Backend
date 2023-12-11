import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import commentRouter from "./routes/commentRouters.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

//Router
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
app.use("/api/user", profileRouter);
app.use("/api/", commentRouter);

const PORT = process.env.PORT;

mongoose 
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
