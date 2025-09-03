import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      id: "gym-01",
      title: "Near gym",
      description: null,
      phone: null,
      latitude: -10.231647,
      longitude: -48.3165735,
    });

    await gymsRepository.create({
      id: "gym-02",
      title: "Far gym",
      description: null,
      phone: null,
      latitude: -23.5868031,
      longitude: -46.6847268,
    });

    const { gyms } = await sut.execute({
      userLatitude: -10.231647,
      userLongitude: -48.3165735,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near gym" })]);
  });
});
