import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticatedUseCase } from "./authenticated";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./Errors/invalid-credentials-error";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticatedUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticatedUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
