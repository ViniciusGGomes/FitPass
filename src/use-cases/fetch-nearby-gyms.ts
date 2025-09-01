import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUse {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseRequest): Promise<FetchNearbyGymsUseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
