import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { MaxNumberOfCheckInsError } from "./Errors/max-number-of-check-ins";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./Errors/max-distance-error";

let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "",
      description: null,
      phone: null,
      latitude: -23.5868031,
      longitude: -46.6847268,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // Red -> Green -> Refectory

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -23.5868031,
        userLongitude: -46.6847268,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should allow multiple users to check in at the same gym on the same day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));
    const { checkIn } = await sut.execute({
      userId: "user-02",
      gymId: "gym-01",
      userLatitude: -23.5868031,
      userLongitude: -46.6847268,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.create({
      id: "gym-02",
      title: "",
      description: "",
      phone: "",
      latitude: new Decimal(-23.5466829),
      longitude: new Decimal(-46.6740516),
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -23.5868031,
        userLongitude: -46.6847268,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
