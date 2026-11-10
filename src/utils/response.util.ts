import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Operación exitosa',
  statusCode: number = 200
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response<ApiResponse> => {
  const response: ApiResponse = {
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString()
  };
  return res.status(statusCode).json(response);
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Recurso creado correctamente'
): Response<ApiResponse<T>> => {
  return successResponse(res, data, message, 201);
};

export const noContentResponse = (res: Response): Response => {
  return res.status(204).send();
};

export const badRequestResponse = (
  res: Response,
  message: string = 'Solicitud inválida',
  error?: string
): Response<ApiResponse> => {
  return errorResponse(res, message, 400, error);
};

export const notFoundResponse = (
  res: Response,
  message: string = 'Recurso no encontrado'
): Response<ApiResponse> => {
  return errorResponse(res, message, 404);
};

export const internalServerErrorResponse = (
  res: Response,
  message: string = 'Error interno del servidor'
): Response<ApiResponse> => {
  return errorResponse(res, message, 500);
};