import { Router } from "express";
import mailbox from "./routes/mailbox";

const app = Router();
mailbox(app);

export default app;
