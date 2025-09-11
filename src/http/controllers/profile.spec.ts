import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
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

    const profileResponse = await request(app.server)
      .get("/me")
      .set(`Authorization`, `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "jhondoe@exemple.com",
      })
    );
  });
});
