import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: err.message || "서버에서 알 수 없는 오류가 발생했습니다.",
  });
};
