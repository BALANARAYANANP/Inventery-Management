import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

const validateMiddleware = (schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params
    });

    if (result.success) {
      // Store parsed & typed data for later use
      req.body = result.data.body;
      req.params = result.data.params;
      next();
    } else {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.message
      });
    }
  };

export default validateMiddleware;
