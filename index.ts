import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server - Hello World!");
});

app.post("/login", (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  
});

app.post("/register", (req: Request, res: Response) => {

});

app.get("/artists", (req: Request, res: Response) => {

});

app.get("/songs/:id", (req: Request, res: Response) => {
  req.params.id;
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});