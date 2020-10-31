import { Container } from "typedi";
import EmailService from "./services/EmailService";
import MessageService from "./services/MessageService";
import mongoose from "mongoose";
export default async ({
  models,
}: {
  models: Array<{ name: string; model: any }>;
}) => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    models.forEach((m) => {
      Container.set(m.name, m.model);
      Container.import([EmailService, MessageService]);
    });
  } catch (e) {
    console.log("🔥 Error on dependency injector loader %o", e);
    throw e;
  }
};
