import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./Errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticatedUserCaseRequest {
  email: string;
  password: string;
}

interface AuthenticatedUserCaseResponse {
  user: User;
}

export class AuthenticatedUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticatedUserCaseRequest): Promise<AuthenticatedUserCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
