import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "John Doe",
    email: "jhondoe@exemple.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/session").send({
    email: "jhondoe@exemple.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
