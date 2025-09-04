import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository);

  return fetchNearbyGymsUseCase;
}
