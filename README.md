# 🔐 API de Autenticação - Node.js + TypeScript

Esta é uma API de autenticação com Node.js, Express e Prisma, focada em gerenciamento de usuários, login, recuperação de senha e tokens JWT para segurança.

Ela inclui envio de e-mails para recuperação de senha e utiliza PostgreSQL como banco de dados.

---

## ✨ Funcionalidades

* Registro de usuário
* Login + Refresh Token (httpOnly cookie)
* Logout seguro
* Esqueci a senha + Reset de senha
* Tokens com expiração curta (access: 15min)
* Rotas privadas protegidas por middleware JWT
* Validação rigorosa com Zod
* Segurança avançada (Helmet, Rate Limit, CORS)

---

## 🛠 Tecnologias

* **Node.js** → motor que executa o código
* **Express** → cria as rotas(caminhos) e gerencia requisições
* **Prisma ORM** → conversa com o banco de dados de forma simples
* **PostgreSQL** → banco de dados relacional (guarda usuários e tokens)
* **JWT (jsonwebtoken)** → gera e valida tokens de autenticação
* **Bcrypt** → transforma senhas em hash seguro
* **Nodemailer** → envia emails (recuperação de senha via Gmail)
* **Zod** → validação forte dos dados que chegam na API
* **Helmet** → adiciona cabeçalhos de segurança HTTP automaticamente
* **express-rate-limit** → limita número de requisições (protege contra ataques de força bruta)
* **cors** → permite que front-end (outro site) acesse a API
* **cookie-parser** → lê e gerencia cookies (usado no refresh token)
* **dotenv** → carrega variáveis secretas do arquivo `.env`

---

## 🗂️ Estrutura do Projeto

O código está organizado assim:

```
lib/: Configurações globais (instância do Prisma).
src/: Pasta principal.
controllers/: Lógica das ações e comunicação com o banco.
middlewares/: Filtros de segurança e validação de tokens.
routes/: Caminhos públicos e privados.
services/: Funções extras (ex: envio de email).
validations/: Checa dados de entrada.
server.ts: Inicia o servidor.

prisma/: Configurações do banco.
.env: Arquivo secreto com chaves (não compartilhe!).
package.json: Lista de ferramentas instaladas.
```

---

## 📋 Pré-requisitos

* Node.js ≥ 18
* PostgreSQL
* Conta de e-mail (recomendado Gmail + App Password)

---

## 🚀 Como Instalar e Configurar (Passo a Passo)

### 1. Clone o repositório:

```
git clone [(https://github.com/Dey-Master/API-REST)]
cd API-REST
```

### 2. Instale as dependências:

```
npm install
```

### 3. Configure as Variáveis de Ambiente:

Crie um arquivo .env na raiz do projeto e adicione:

```
# === Banco de Dados ===
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

# === Servidor ===
PORT=8000
HOST=0.0.0.0 //IP da maquina(computador)

# === JWT ===
JWT_SECRET=sua_chave_secreta_muito_forte_256bits_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_muito_forte_diferente

# === E-mail (Nodemailer) ===
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_app_password_do_gmail

# === Rate Limit ===
RATE_LIMIT_WINDOW_MS=180000
RATE_LIMIT_MAX_REQUESTS=15

# === Cors ===
CORS_ORIGIN="/production"
CORS_ORIGIN_NODE_ENV="https://meusite.com"
```

### 4. Sincronize o Banco de Dados:

```
npx prisma migrate dev --name init

npx prisma generate
```

Visualizar tabelas com prisma(Opcional)

```
npx prisma studio
```

### 5. Inicie o Servidor:

```
npm run dev
```

---

## 🧪 Como Testar e Usar a API

Use ferramentas como Postman, Thunder Client (extensão VS Code) ou Insomnia. Elas simulam requisições como um app faria.

### Instalando as Ferramentas

* Postman: Baixe em postman.com. Gratuito.
* Thunder Client: No VS Code, busque na aba Extensions.
* Insomnia: Baixe em insomnia.rest.

---

## # Passos para Testar

### 1. Criar uma Conta (POST /register)

```
http://0.0.0.0:8000/api/register
```

Body:

```
{
    "firstName": "Nome",
    "lastName": "Sobrenome",
    "email": "teste@gmail.com",
    "password": "Senha123@",
}
```

Deve retornar sucesso.

---

### 2. Realizar Login (POST /login)

```
http://0.0.0.0:8000/api/login
```

Body:

```
{
    "email": "teste@gmail.com",
    "password": "Senha123@",
}
```

Resposta do Servidor (Sucesso):

```
{
  "message": "Login realizado com sucesso!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "8ce7675d-89b1-4234-acf1-95f01f8c8a70",
    "firstname": "Nome",
    "lastname": "Sobrenome",
    "email": "teste@gmail.com",
    "role": "USER"
  }
}
```

---

### 3. Solicitar nova senha (POST /forgot-password)

```
http://0.0.0.0:8000/api/forgot-Password
```

Body:

```
{
    "email": "teste@gmail.com"
}
```

Resposta do Servidor (Sucesso):

```
{
  "message": "E-mail de redefinição enviado!"
}
```

---

### 4. Alterar a senha (PUT /reset-password/:token)

```
http://0.0.0.0:8000/api/reset-password/:token
```

Body:

```
{
    "password": "SenhaNova123@",
}
```

Resposta do Servidor (Sucesso):

```
{
  "message": "Senha redifinida com sucesso!"
}
```

---

### 5. Solicitar novo token (POST /refresh)

Necessitasse do Token para o /refresh (Auth)

Bearer:

```
Token =>  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Resposta do Servidor (Sucesso):

```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 6. Realizar Logout (POST /privete/logout)

```
http://0.0.0.0:8000/api/privete/logout
```

Necessitasse do Token para o /logout (Auth)

Bearer:

```
Token =>  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Resposta do Servidor:

```
Status(204)
```

---

## 🛣️ Rotas (Endpoints)

### Públicos

* POST /register: Cadastra usuário.
* POST /login: Faz login.
* POST /refresh: Renova token.
* POST /forgot-Password: Pede alteração da senha.
* PUT /reset-password/:token: Altera a senha.

### Privados

* POST /logout: Sai da conta.

---

## 🔒 Segurança

* Senhas → sempre com bcrypt (hash + salt)
* Tokens → JWT expira em 15min (accessToken) ou 7d (refreshToken). Sempre cheque headers.
* Helmet → protege contra ataques comuns via headers.
* express-rate-limit → bloqueia quem tenta muitas requisições rápidas.
* Validação com Zod → impede dados inválidos
* Emails → só envia se email existir (não revela se conta existe)

---

Desenvolvido por [Abednego Mayamba](https://github.com/Dey-Master)
