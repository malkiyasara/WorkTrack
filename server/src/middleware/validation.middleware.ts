import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export interface ValidatedRequest extends Request {
    validatedData?: any;
}

const validate = (schema: ZodSchema) => {
    return (req: ValidatedRequest, res: Response, next: NextFunction): any => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten(),
            });
        }

        req.validatedData = result.data;
        next();
    };
};

export default validate;
