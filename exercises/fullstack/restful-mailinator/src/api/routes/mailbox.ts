import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, errors } from "celebrate";
import { Container } from "typedi";
import EmailService from "../../services/EmailService";
import validateParam from "../middlewares/validateParams";
import MessageService from "../../services/MessageService";
const route = Router();

export default (app: Router) => {
  app.use("/mailboxes", route);
  app.use(errors());

  /**
   * POST /mailboxes: Create a new, random email address.
   */
  route.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailService = Container.get<EmailService>("EmailService");

      const { email } = await emailService.createEmail();
      return res.json({ email }).status(201);
    } catch (e) {
      console.log("🔥 error ", e);
      return next(e);
    }
  });
  /**
   * POST /mailboxes/{email address}/messages: Create a new message for a specific email address.
   */
  route.post(
    "/:email/messages",
    validateParam,
    celebrate({
      body: Joi.object({
        message: Joi.string().max(4096),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.params;
      const { message } = req.body;
      try {
        const messageService = Container.get<MessageService>("MessageService");
        const resp = await messageService.createMessage(email, message);
        return res.json(resp).status(200);
      } catch (e) {
        console.log("🔥 error ", e);
        return next(e);
      }
    }
  );
  /**
   * GET /mailboxes/{email address}/messages: Retrieve an index of messages sent to an email address, including sender, subject, and id, in recency order. Support cursor-based pagination through the index.
   */
  route.get(
    "/:email/messages",
    validateParam,
    celebrate({
      query: Joi.object({
        size: Joi.number().default(0).optional(),
        page: Joi.number().default(0).optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { email } = req.params;
      const { size, page }: any = req.query;
      const messageService = Container.get<MessageService>("MessageService");
      return res
        .json({
          metadata: {
            email,
            size,
            page,
          },
          data: await messageService.getIndexes(email, size, page),
        })
        .status(201);
    }
  );
  /**
   * GET /mailboxes/{email address}/messages/{message id}: Retrieve a specific message by id.
   */
  route.get(
    "/:email/messages/:message_id",
    validateParam,
    async (req: Request, res: Response) => {
      const { email, message_id } = req.params;
      const messageService = Container.get<MessageService>("MessageService");

      return res
        .json(await messageService.getByMessageID(email, message_id))
        .status(501);
    }
  );
  /**
   * DELETE /mailboxes/{email address}: Delete a specific email address and any associated messages.
   */
  route.delete(
    "/:email",
    validateParam,
    async (req: Request, res: Response) => {
      const { email } = req.params;
      const emailService = Container.get<EmailService>("EmailService");
      const messageService = Container.get<MessageService>("MessageService");
      const deletedEmailResponse = await emailService.deleteEmail(email);
      const deletedEmailMessagesReponse = await messageService.deleteEmailMessages(
        email
      );
      return res
        .json({ deletedEmailResponse, deletedEmailMessagesReponse })
        .status(200);
    }
  );
  /**
   * DELETE /mailboxes/{email address}/messages/{message id}: Delete a specific message by id.
   */
  route.delete(
    "/:email/messages/:message_id",
    validateParam,
    celebrate({
      params: Joi.object({
        email: Joi.string().optional(),
        message_id: Joi.string().required(),
      }).optional(),
    }),
    async (req: Request, res: Response) => {
      const { email, message_id } = req.params;

      const messageService = Container.get<MessageService>("MessageService");
      const deletedMessageResponse = await messageService.deleteMessageByID(
        email,
        message_id
      );
      return res.json(deletedMessageResponse).status(200);
    }
  );
};
