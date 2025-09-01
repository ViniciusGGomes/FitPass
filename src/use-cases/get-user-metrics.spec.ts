import { describe, it, beforeEach, expect } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toBe(2);
  });
});
