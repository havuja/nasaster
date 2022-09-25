import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import asteroidsRoutes from "./routes/asteroids";

dotenv.config();
const app: Express = express();
app.use(cors());
app.options("*", cors());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.jsonp({ message: "Ok" });
});

app.use("/asteroids", asteroidsRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Nasaster now listening on port ${port}`);
  });
}

export default app;
