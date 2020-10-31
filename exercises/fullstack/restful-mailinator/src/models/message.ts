import * as mongoose from "mongoose";
import { IMessage } from "../interfaces";

const message = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Enter a message."],
  },
  email: {
    type: String,
    required: [true, "Enter an email."],
    index: true,
  },
});

export default mongoose.model<IMessage & mongoose.Document>("Message", message);
