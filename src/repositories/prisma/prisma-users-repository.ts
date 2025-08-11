import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class PrismaUsersRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
