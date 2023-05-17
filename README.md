# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

O objetivo do projeto é desenvolver um serviço Back-End para gerenciar uma imobiliária, seus usuários, imóveis e visitas. Tecnologias utilizadas:

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
http://localhost:3000

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama de Entidade e Relacionamentos da API definindo bem as relações entre as tabelas do banco de dados.

![DER](der-kimoveis.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

### 4.1. **Login**

O objeto Login é definido como:

| Campo    | Tipo   | Descrição                    |
| -------- | ------ | ---------------------------- |
| email    | string | O e-mail do usuário.         |
| password | string | A senha de acesso do usuário |

### Endpoint

| Método | Rota   | Descrição            |
| ------ | ------ | -------------------- |
| POST   | /login | Login de um usuário. |

### Exemplo de Request:

```
POST /login
Host: http://localhost:3000/login
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "maria@email.com",
  "password": "1234"
}
```

### Schema de validação com Zod:

```javascript
email: z.string().email(),
password: z.string()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplos de Response:

```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjg0MzQ3NzMyLCJleHAiOjE2ODQ0MzQxMzIsInN1YiI6IjEifQ.Ab2eer3E3gBv6uTWmyXQbSeqy5QkpcLHZ00BUI-FC0c"
}
```

### Possíveis erros:

| Código do Erro   | Descrição            |
| ---------------- | -------------------- |
| 401 Unauthorized | Invalid credentials. |

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listando-usuários)
  - [PATCH - /users/:id](#13-editar-usuário-por-id)
  - [DELETE - /users/:id](#14-soft-delete-em-usuário-por-id)
- [RealEstates](#2-realestates)
  - [POST - /realEstate](#21-criação-de-imóvel)
- [Categories](#3-categories)
  - [POST - /categories](#31-crição-de-categoria)
  - [GET - /categories](#32-listando-categorias)
  - [GET - /categories/:id/realEstate](#33-listando-imóveis-de-uma-categoria)
- [Schedules](#4-schedules)
  - [POST - /schedules](#41-criação-de-visita)
  - [GET - /schedules/realEstate/:id](#42-listando-agendamentos-de-um-imóvel)

---

## 1. **Users**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo     | Tipo    | Descrição                                    |
| --------- | ------- | -------------------------------------------- |
| id        | string  | Identificador único do usuário.              |
| name      | string  | O nome do usuário.                           |
| email     | string  | O e-mail do usuário.                         |
| password  | string  | A senha de acesso do usuário.                |
| admin     | boolean | Define se um usuário é Administrador ou não. |
| createdAt | string  | Data de criação do usuário.                  |
| updatedAt | string  | Data de atualização do usuário.              |
| deletedAt | string  | Data de deleção do usuário.                  |

### Endpoints

| Método | Rota       | Descrição                                                       |
| ------ | ---------- | --------------------------------------------------------------- |
| POST   | /users     | Criação de um usuário.                                          |
| GET    | /users     | Lista todos os usuários.                                        |
| PATCH  | /users/:id | Atualiza um usuário usando seu ID como parâmetro.               |
| DELETE | /users/:id | Realiza um soft delete no usuário usando seu ID como parâmetro. |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: http://localhost:3000/users
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "maria",
  "email": "maria@email.com",
  "admin": false,
  "password": "1234"
}
```

### Schema de Validação com Zod:

```javascript
name: z.string().min(3).max(45),
email: z.string().max(45).email(),
admin: z.boolean().optional().default(false),
password: z.string().max(20)
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": 2,
  "name": "maria",
  "email": "maria@email.com",
  "admin": false,
  "createdAt": "2023-05-17",
  "updatedAt": "2023-05-17",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

Utilizar token de usuário admin.

### Exemplo de Request:

```
GET /users
Host: http://localhost:3000/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjg0MzQ5OTc1LCJleHAiOjE2ODQ0MzYzNzUsInN1YiI6IjMifQ.K0nrSeDcchK_QcsfBw_4VTwR5stp1fcXTHlWF2h8FZg
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": 1,
    "name": "joice",
    "email": "joice@email.com",
    "admin": true,
    "createdAt": "2023-03-10",
    "updatedAt": "2023-03-10",
    "deletedAt": null
  },
  {
    "id": 2,
    "name": "maria",
    "email": "maria@email.com",
    "admin": false,
    "createdAt": "2023-05-17",
    "updatedAt": "2023-05-17",
    "deletedAt": null
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 403 Forbidden  | Insufficient permission. |

---

### 1.3. **Editar usuário por id**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

Não é possível atualizar os campos de id e admin. Administradores podem atualizar qualquer usuário, usuários não-administradores podem atualizar apenas seu próprio usuário.

### Exemplo de Request:

```
PATCH /users/:id
Host: http://localhost:3000/users/2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
{
  "name": "maria s"
}
```

### Schema de Validação com Zod:

```javascript
name?: z.string().min(3).max(45),
email?: z.string().max(45).email(),
admin?: z.boolean().optional().default(false),
password?: z.string().max(20)
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": 2,
  "name": "maria s",
  "email": "maria@email.com",
  "admin": false,
  "createdAt": "2023-05-17",
  "updatedAt": "2023-05-17",
  "deletedAt": null
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Missing bearer token.    |
| 403 Forbidden    | Insufficient permission. |
| 404 Not Found    | User not found.          |
| 409 Conflict     | Email already exists.    |

### 1.4. **Soft-delete em usuário por id**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

Rota acessada somente por administradores.

### Exemplo de Request:

```
DELETE /users/:id
Host: http://localhost:3000/users/2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Missing bearer token.    |
| 403 Forbidden    | Insufficient permission. |
| 404 Not Found    | User not found.          |

### 2.1. **Criação de imóvel**

[ Voltar aos Endpoints ](#5-endpoints)

### `/realEstate`

Rota acessada somente por administradores.

### Exemplo de Request:

```
POST /realEstate
Host: http://localhost:3000/realEstate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "value": 1000800.5,
  "size": 879,
  "address": {
    "street": "Rua das Laranjeiras",
    "zipCode": "12345678",
    "city": "Nápoles",
    "state": "SP",
    "number": "12"
  },
  "categoryId": 1
}
```

### Schema de Validação com Zod:

```javascript
value: z.string().regex(/\d+/).transform(Number).refine((value) => value >= 0).or(z.number().positive()),
size: z.number().positive(),
address: {
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).optional().nullable(),
    city: z.string().max(20),
    state: z.string().max(2)
},
categoryId: z.number()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": 2,
  "value": 1000800.5,
  "size": 879,
  "sold": false,
  "createdAt": "2023-05-17",
  "updatedAt": "2023-05-17",
  "address": {
    "street": "Rua das Laranjeiras",
    "zipCode": "12345678",
    "number": "12",
    "city": "Nápoles",
    "state": "SP",
    "id": 2
  },
  "category": {
    "name": "Apartamento",
    "id": 1
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Missing bearer token.    |
| 403 Forbidden    | Insufficient permission. |
| 404 Not Found    | User not found.          |
| 409 Conflict     | Address already exists.  |
| 404 Not Found    | Category not found.      |

### 3.1. **Crição de categoria**

[ Voltar aos Endpoints ](#5-endpoints)

### `/categories`

Rota acessada somente por administradores.

### Exemplo de Request:

```
POST /categories
Host: http://localhost:3000/categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Apartamento"
}
```

### Schema de Validação com Zod:

```javascript
name: z.string();
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": 1,
  "name": "Apartamento"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Missing bearer token.    |
| 403 Forbidden    | Insufficient permission. |
| 409 Conflict     | Category already exists. |

### 3.2. **Listando categorias**

[ Voltar aos Endpoints ](#5-endpoints)

### `/categories`

### Exemplo de Request:

```
GET /categories
Host: http://localhost:3000/categories
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": 1,
    "name": "Apartamento"
  }
]
```

### Possíveis Erros:

Nenhum erro, mas poderá retornar um array vazio caso não exista nenhuma categoria.

### 3.3. **Listando imóveis de uma categoria**

[ Voltar aos Endpoints ](#5-endpoints)

### `/categories/:id/realEstate`

### Exemplo de Request:

```
GET /categories/:id/realEstate
Host: http://localhost:3000/categories/1/realEstate
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                   |
| --------- | ------ | ------------------------------------------- |
| id        | string | Identificador único da categoria (Category) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": 1,
  "name": "Apartamento",
  "realEstate": [
    {
      "id": 1,
      "sold": false,
      "value": "1000800.50",
      "size": 879,
      "createdAt": "2023-03-10",
      "updatedAt": "2023-03-10"
    },
    {
      "id": 2,
      "sold": false,
      "value": "1000800.50",
      "size": 879,
      "createdAt": "2023-05-17",
      "updatedAt": "2023-05-17"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Category not found. |

### 4.1. **Criação de visita**

[ Voltar aos Endpoints ](#5-endpoints)

### `/schedules`

### Exemplo de Request:

```
POST /schedules
Host: http://localhost:3000/realEstate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "date": "2023/06/06",
  "hour": "13:30",
  "realEstateId": 1
}
```

### Schema de Validação com Zod:

```javascript
date: z.string(),
hour: z.string(),
realEstateId: z.number()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "message": "Schedule created"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                                                               |
| ---------------- | ----------------------------------------------------------------------- |
| 400 Bad Request  | Invalid date, work days are monday to friday.                           |
| 400 Bad Request  | Invalid hour, available times are 8AM to 18PM.                          |
| 401 Unauthorized | Missing bearer token.                                                   |
| 404 Not Found    | RealEstate not found.                                                   |
| 409 Conflict     | Schedule to this real estate at this date and time already exists.      |
| 409 Conflict     | User schedule to this real estate at this date and time already exists. |

### 4.2. **Listando agendamentos de um imóvel**

[ Voltar aos Endpoints ](#5-endpoints)

### `/schedules/realEstate/:id`

Rota acessada apenas por administradores.

### Exemplo de Request:

```
GET /schedules/realEstate/:id
Host: http://localhost:3000/schedules/realEstate/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDM1MDI4MywiZXhwIjoxNjg0NDM2NjgzLCJzdWIiOiIyIn0.cTX_RtLY4XnGs46mSJSC1RXCmJdRTu5z5d3n1B2FqnQ
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                  |
| --------- | ------ | ------------------------------------------ |
| id        | string | Identificador único do imóvel (RealEstate) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": 1,
  "sold": false,
  "value": "1000800.50",
  "size": 879,
  "createdAt": "2023-03-10",
  "updatedAt": "2023-03-10",
  "address": {
    "id": 1,
    "street": "Rua 22",
    "zipCode": "12345678",
    "number": "23",
    "city": "Nápoles",
    "state": "SP"
  },
  "category": {
    "id": 1,
    "name": "Apartamento"
  },
  "schedules": [
    {
      "id": 3,
      "date": "2023-06-06",
      "hour": "13:30:00",
      "user": {
        "id": 1,
        "name": "joice",
        "email": "joice@email.com",
        "admin": true,
        "password": "$2a$10$bppG26feaxR942GJyqSpVuulSkPDrDEM38cRlUhgmPCQTrwwPeYai",
        "createdAt": "2023-03-10",
        "updatedAt": "2023-03-10",
        "deletedAt": null
      }
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Missing bearer token.    |
| 403 Forbidden    | Insufficient permission. |
| 404 Not Found    | RealEstate not found.    |
