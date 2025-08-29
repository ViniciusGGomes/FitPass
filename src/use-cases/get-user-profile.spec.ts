import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfile } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./Errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe("Get User profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfile(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const userId = await usersRepository.create({
      name: "john doe",
      email: "johndoe@example.com",
      password_hash: await hash("123455", 6),
    });

    const { user } = await sut.execute({
      userId: userId.id,
    });

    expect(user.id).toEqual(userId.id);
    expect(user.name).toEqual("john doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "no-exist-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
