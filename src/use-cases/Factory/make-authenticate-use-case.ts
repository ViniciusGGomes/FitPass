import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticatedUseCase } from "../authenticated";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticatedUseCase = new AuthenticatedUseCase(userRepository);

  return authenticatedUseCase
}
