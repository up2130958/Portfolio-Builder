import "express";

declare module "express" {
  interface Request {
    session: {
      adminId?: number;
      username?: string;
    } | null;
  }
}
