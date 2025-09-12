import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        title: "javascript Gym",
        description: "some description",
        phone: "6399999999",
        latitude: -23.5868031,
        longitude: -46.6847268,
      });

    await request(app.server)
      .post("/gyms")
      .set(`Authorization`, `Bearer ${token}`)
      .send({
        title: "typeScript Gym",
        description: "some description",
        phone: "6399999999",
        latitude: -23.5868031,
        longitude: -46.6847268,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "typeScript",
      })
      .set(`Authorization`, `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "typeScript Gym",
      }),
    ]);
  });
});
