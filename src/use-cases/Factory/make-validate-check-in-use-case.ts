import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidationCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validationCheckInUseCase = new ValidateCheckInUseCase(
    checkInsRepository
  );

  return validationCheckInUseCase;
}
