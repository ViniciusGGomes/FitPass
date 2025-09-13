import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";

describe("Create check-in (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -23.5868031,
        longitude: -46.6847268,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        latitude: -23.5868031,
        longitude: -46.6847268,
      });

    expect(response.statusCode).toEqual(201);
  });
});
