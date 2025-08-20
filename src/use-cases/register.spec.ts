import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("register use case", () => {
  it("should hash user password upon register", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "John doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
