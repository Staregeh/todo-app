import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const Validator =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json(err.message);
    }
  };

export default Validator;
