import { InvalidCredentialsError } from "@/use-cases/Errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/Factory/make-authenticate-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  try {
    const authenticatedUseCase = makeAuthenticateUseCase();

    const { user } = await authenticatedUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
