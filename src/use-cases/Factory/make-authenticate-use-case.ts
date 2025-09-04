import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticatedUseCase } from "../authenticated";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticatedUseCase = new AuthenticatedUseCase(usersRepository);

  return authenticatedUseCase
}
