import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import asteroidsRoutes from "./routes/asteroids";

dotenv.config();
const app: Express = express();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.jsonp({ message: "Ok" });
});

app.use("/asteroids", asteroidsRoutes);

app.listen(port, () => {
  console.log(`Nasaster now listening on port ${port}`);
});
