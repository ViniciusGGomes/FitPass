import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { describe } from "node:test";
import request from "supertest";
import { afterAll, beforeAll, expect, it } from "vitest";

describe("Validate check-in (e2e)", () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it("should be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -23.5868031,
        longitude: -46.6847268,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set(`Authorization`, `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  });

});
