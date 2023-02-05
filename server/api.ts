import express from "express";
import { NextFunction, Request, Response } from "express";
import UserRouter from "./User/router";

const router = express.Router();

router.use("/user", UserRouter);

router.get("/test", (req: Request, res: Response) => {
  console.log("Received!");
  res.status(200).send({ message: "Server here!" });
});

router.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send({ message: "Cool!" });
});

export default router;
