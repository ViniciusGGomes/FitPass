import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/session", authenticate);

  //** Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
