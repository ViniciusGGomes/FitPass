# API FitPass 🚀

Inspirado em aplicações como o **GymPass**, este projeto é uma **API REST** em **Node.js** para gerenciar **cadastro, autenticação e check-ins de usuários em academias**.

O objetivo principal foi construir uma solução **robusta e escalável**, aplicando as melhores práticas de **arquitetura de software**, **testes automatizados** e **segurança**.

---

## 🚀 Principais Aprendizados

🔹 **Arquitetura Sólida e Escalável**  
Aplicação desenvolvida com princípios **SOLID**, **Design Patterns** (In-Memory, Repository, Factory) e arquitetura guiada por **Use-Cases**, resultando em um código desacoplado, manutenível e testável.

🔹 **Estratégia de Testes Completa**  
Implementação de **TDD** em regras complexas, testes **unitários** e **end-to-end (E2E)** para garantir confiabilidade e qualidade do sistema.

🔹 **Autenticação e Segurança**  
Autenticação com **JWT + Refresh Tokens**, armazenados em cookie para maior segurança.

- Access Token → curta duração.
- Refresh Token → longa duração, usado para renovar sessão de forma transparente.  
  Além disso, foi implementado **RBAC (Role-Based Access Control)** para permissões de administrador.

🔹 **Automação com CI**  
Pipeline no **GitHub Actions** executando testes unitários em cada `push` e testes E2E em cada `pull request`.

---

## 🛠️ Stack Principal

**Backend / API**  
Fastify, @fastify/cookie, @fastify/jwt, bcryptjs, dayjs, zod, dotenv

**Banco de Dados**  
Prisma ORM (@prisma/client), PostgreSQL (Docker/Bitnami)

**Testes**  
Vitest, Supertest, @vitest/ui, @vitest/coverage-v8

**Build / Dev Tools**  
TypeScript, tsx, tsup, vite-tsconfig-paths

---

# 📌 Funcionalidades (RFs)

- [x] Cadastro de usuário
- [x] Autenticação de usuário
- [x] Obter perfil do usuário logado
- [x] Obter número de check-ins do usuário logado
- [x] Histórico de check-ins do usuário
- [x] Buscar academias próximas (até 10km)
- [x] Buscar academias por nome
- [x] Realizar check-in em uma academia
- [x] Validar check-in de um usuário
- [x] Cadastrar academia

---

# ⚖️ Regras de Negócio (RNs)

- [x] Não permitir cadastro com e-mail duplicado
- [x] Não permitir mais de 1 check-in por dia
- [x] Check-in permitido apenas se usuário estiver próximo (≤ 100m da academia)
- [x] Check-in só pode ser validado até 20 minutos após criação
- [x] Apenas **administradores** podem validar check-ins
- [x] Apenas **administradores** podem cadastrar academias

---

# ⚙️ Requisitos Não Funcionais (RNFs)

- [x] Banco de dados **PostgreSQL** rodando em **Docker**
- [x] **Prisma ORM** para acesso ao banco
- [x] Testes automatizados integrados no **CI/CD (GitHub Actions)**
- [x] API construída com **Fastify** (alta performance)
- [x] Projeto escrito em **TypeScript**

---
