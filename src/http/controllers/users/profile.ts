import { makeGetUserProfileUseCase } from "@/use-cases/Factory/make-get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({
    userId: request.user.sub,
  });

  const userWithoutPassword = {
    user: {
      ...user,
      password_hash: undefined,
    },
  };

  return reply.status(200).send(userWithoutPassword);
}
