import { Service, Inject } from "typedi";
import TypeEmail from "../models/email";
import TypeMessage from "../models/message";
import generateRandomEmail from "../utils/generateRandomEmail";
import { IEmail } from "../interfaces/IEmail";
import { IMessage } from "../interfaces/IMessage";

@Service("EmailService")
export default class EmailService {
  constructor(
    @Inject("emailModel") private emailModel: typeof TypeEmail,
    @Inject("messageModel") private messageModel: typeof TypeMessage
  ) {}

  public async createEmail(): Promise<{ email: IEmail }> {
    const generatedEmail = generateRandomEmail();
    try {
      const emailRecord = await this.emailModel.create({
        email: generatedEmail,
      });
      const { email } = emailRecord.toObject();
      return { email };
    } catch (e) {
      throw e;
    }
  }
  public async deleteEmail(email: string) {
    try {
      const response = await this.emailModel.deleteOne({ email });
      return response;
    } catch (e) {
      throw e;
    }
  }
  public async createMessage(
    reciv_email: string,
    reciv_message: string
  ): Promise<IMessage> {
    try {
      const messageRecord = await this.messageModel.create<IMessage>({
        email: reciv_email,
        message: reciv_message,
      });
      const { email, message } = messageRecord.toObject();
      return { email, message };
    } catch (e) {
      throw e;
    }
  }
}
