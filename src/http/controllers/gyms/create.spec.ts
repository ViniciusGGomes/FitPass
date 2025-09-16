import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "some description",
        phone: "6399999999",
        latitude: -23.5868031,
        longitude: -46.6847268,
      });

    expect(response.statusCode).toEqual(201);
  });
});
