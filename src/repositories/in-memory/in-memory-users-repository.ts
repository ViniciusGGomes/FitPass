import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class InMemoryUsersRepository implements UserRepository {
  public itens: User[] = [];

  async findById(id: string) {
    const user = this.itens.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.itens.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.itens.push(user);

    return user;
  }
}
