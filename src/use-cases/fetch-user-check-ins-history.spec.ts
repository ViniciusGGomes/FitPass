import { describe, it, beforeEach, expect } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch user check ins history use case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({ userId: "user-01", page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
    expect;
  });

  it("should be able to fetch paginated user check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      // Vai criar até o 22
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
