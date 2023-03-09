import { Request, Response, NextFunction } from "express";

export const tryCatchMiddleware =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, data } = await fn(req, res, next);
      if (status !== null) {
        res.status(status).json(data);
      }
      next();
    } catch (err: any) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
