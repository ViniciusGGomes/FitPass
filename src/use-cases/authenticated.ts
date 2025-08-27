import { UserRepository } from "@/repositories/users-repository";
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
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticatedUserCaseRequest): Promise<AuthenticatedUserCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

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
