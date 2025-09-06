import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}

// A interface vai disser quais métodos(create) vão existir no meu repositório, e quais parâmetros esse método vai receber. Exemplo: método -> create. e ele devolve uma promise(Vai demorar para fazer) que é o User

// Recebo o email, e devolvo o usuário, mas se não encontrar a promise vai devolver um usuário ou null caso não tenha encontrado
