import { Service, Inject } from "typedi";
import TypeEmail from "../models/email";
import TypeMessage from "../models/message";
import { IMessage } from "../interfaces/IMessage";

@Service("MessageService")
export default class MessageService {
  constructor(
    @Inject("messageModel") private messageModel: typeof TypeMessage
  ) {}
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
  public async deleteEmailMessages(email: string) {
    try {
      return await this.messageModel.deleteMany({ email });
    } catch (e) {
      throw e;
    }
  }
  public async deleteMessageByID(email: string, message_id: string) {
    try {
      return await this.messageModel.deleteOne({ message_id });
    } catch (e) {
      throw e;
    }
  }
  public async getByMessageID(
    email: string,
    message_id: string
  ): Promise<IMessage> {
    try {
      const messageRecords = await this.messageModel.findById(message_id);
      const { email, message } = messageRecords?.toObject();
      return { email, message };
    } catch (e) {
      throw e;
    }
  }
  public async getIndexes(
    reciv_email: string,
    reciv_limit: number,
    reciv_page: number
  ): Promise<IMessage[]> {
    try {
      const messageRecords = await this.messageModel
        .find({ email: reciv_email })
        .skip(reciv_page * reciv_limit)
        .sort({ _id: -1 })
        .limit(reciv_limit);
      return messageRecords.map((msgRecord) => msgRecord.toObject());
    } catch (e) {
      throw e;
    }
  }
}
