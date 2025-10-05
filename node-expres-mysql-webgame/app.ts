import express from "express";

import { router as user } from "./controller/User";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/user", user);
app.use("/uploads", express.static("uploads"));
