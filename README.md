# App

FitPass <-> inspired by GymPass app.

# RFs (Requisitos Funcionais) - Funcionalidades que a aplicação deve oferecer
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins 
- [ ] Deve ser possível o usuário buscar academias próximas
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário
- [ ] Deve ser possível cadastrar uma academia

# RNs (Regras de negocio) - Condições ou restrições específicas que a aplicação deve seguir

- [x] O usuário não pode se cadastrar com e-mail duplicado
- [ ] O usuário não pode fazer 2 check-ins ao mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100) da academia.
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

# RNF (Requisitos não funcionais) - Características técnicas, que impactam o funcionamento do sistema

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco Postgresql
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)