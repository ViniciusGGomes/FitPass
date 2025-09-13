import { makeValidationCheckInUseCase } from "@/use-cases/Factory/make-validate-check-in-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validationCheckInUseCase = makeValidationCheckInUseCase();

  await validationCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
