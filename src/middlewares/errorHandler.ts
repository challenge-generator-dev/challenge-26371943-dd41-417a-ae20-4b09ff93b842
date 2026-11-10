import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/notFound.exception';

export interface ErrorResponse {
    success: boolean;
    statusCode: number;
    message: string;
    timestamp: string;
    path?: string;
    errors?: Array<{ field: string; message: string }>;
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(`[Error] ${err.constructor.name}: ${err.message}`);
    console.error(`[Error Stack] ${err.stack}`);

    let statusCode: number = 500;
    let message: string = 'Error interno del servidor';
    let errors: Array<{ field: string; message: string }> | undefined;

    if (err instanceof HttpException) {
        statusCode = err.statusCode;
        message = err.message;

        if (err instanceof ValidationException && err.errors) {
            errors = err.errors;
        }
    } else if (err instanceof NotFoundException) {
        statusCode = 404;
        message = err.message;
    } else if (err instanceof ValidationException) {
        statusCode = 400;
        message = err.message;
        if (err.errors) {
            errors = err.errors;
        }
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Error de validación de datos';
        errors = extractValidationErrors(err);
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'ID de formato inválido';
    } else if (err.code === 'ENOENT') {
        statusCode = 404;
        message = 'Recurso no encontrado';
    } else if (err.code === 'PERMISSION_DENIED') {
        statusCode = 403;
        message = 'Permiso denegado';
    }

    const response: ErrorResponse = {
        success: false,
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: req.path
    };

    if (errors && errors.length > 0) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
}

function extractValidationErrors(err: any): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = [];

    if (err.errors) {
        for (const key in err.errors) {
            const error = err.errors[key];
            errors.push({
                field: key,
                message: error.message || 'Validation error'
            });
        }
    }

    return errors;
}

export function notFoundHandler(req: Request, res: Response): void {
    const response: ErrorResponse = {
        success: false,
        statusCode: 404,
        message: `Ruta ${req.method} ${req.path} no encontrada`,
        timestamp: new Date().toISOString(),
        path: req.path
    };

    res.status(404).json(response);
}

export function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}