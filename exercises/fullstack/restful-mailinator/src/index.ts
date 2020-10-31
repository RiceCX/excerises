import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import dependencyInjector from "./dependencyInjector";
import EmailModel from "./models/email";
import MessageModel from "./models/message";
import RequestError from "./interfaces/IRequestError";
import routes from "./api";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const server = express();

server.use(bodyParser.json());
server.use("/", routes);
// inject dependencies.
const emailModel = {
  name: "emailModel",
  model: EmailModel,
};
const messageModel = {
  name: "messageModel",
  model: MessageModel,
};
(async () =>
  await dependencyInjector({ models: [emailModel, messageModel] }))();

console.log("✌️ Dependency Injector loaded");
server.get("/", (_req, res) => {
  return res.json({
    msg: "hello",
  });
});
/// catch 404 and forward to error handler
server.use((req, res, next) => {
  const err = new Error("Not Found") as any;
  err.status = 404;
  next(err);
});

/// error handlers
server.use(
  (err: RequestError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  }
);
server.listen(PORT, () => console.log(`🚀 Listening on port: ${PORT}`));
