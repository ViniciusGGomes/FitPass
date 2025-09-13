import { makeFetchNearbyGymUseCase } from "@/use-cases/Factory/make-fetch-nearby-gyms-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const fetchNearbyGymUseCase = makeFetchNearbyGymUseCase();

  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  reply.status(200).send({ gyms });
}
