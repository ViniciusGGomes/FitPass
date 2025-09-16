import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        title: "gym-01",
        description: "near gym",
        phone: "6399999999",
        latitude: -10.231647,
        longitude: -48.3165735,
      });

    await request(app.server)
      .post("/gyms")
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        title: "gym-02",
        description: "far gym",
        phone: "6399999999",
        latitude: -23.5868031,
        longitude: -46.6847268,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -10.231647,
        longitude: -48.3165735,
      })
      .set(`Authorization`, `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "gym-01",
      }),
    ]);
  });
});
