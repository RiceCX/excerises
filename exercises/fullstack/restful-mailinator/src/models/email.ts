import * as mongoose from "mongoose";
import { IEmail } from "../interfaces/IEmail";

const email = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter an email."],
    index: true,
    unique: true,
  },
});

export default mongoose.model<IEmail & mongoose.Document>("Email", email);
