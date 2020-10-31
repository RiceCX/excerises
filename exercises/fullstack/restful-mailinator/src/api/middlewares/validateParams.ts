import { celebrate, Joi } from "celebrate";
import { Request, Response, NextFunction } from "express";

export default function validateParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.params);
  celebrate({
    params: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      message_id: Joi.string().optional(),
    }),
  })(req, res, next);
}
