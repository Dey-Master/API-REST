🔐 API de Autenticação - Node.js + TypeScript

Esta é uma API de autenticação desenvolvida com Node.js, Express e Prisma, focada em gerenciamento de usuários, login, recuperação de senha e tokens JWT para segurança. Ela inclui envio de e-mails para recuperação de senha e utiliza PostgreSQL como banco de dados.

✨ Funcionalidades

Registro de usuário
Login + Refresh Token (httpOnly cookie)
Logout seguro
Esqueci a senha + Reset de senha
Tokens com expiração curta (access: 15min)
Rotas privadas protegidas por middleware JWT
Validação rigorosa com Zod
Segurança avançada (Helmet, Rate Limit, CORS)

🛠 Tecnologias

Node.js + Express
TypeScript
Prisma + PostgreSQL
JWT (jsonwebtoken)
Zod (validação)
bcryptjs (hash de senha)
Nodemailer
Helmet, cors, express-rate-limit


📋 Pré-requisitos

Node.js ≥ 18
PostgreSQL
Conta de e-mail (recomendado Gmail + App Password)


🚀 Instalação e Execução

# Clone o repositório
git clone https://github.com/seuusuario/sua-api-auth.git

cd sua-api-auth

# Instale as dependências
npm install

⚙️ Configuração do .env

Crie um arquivo .env na raiz do projeto:
# === Servidor ===
PORT=8000
HOST=localhost

# === JWT ===
JWT_SECRET=sua_chave_secreta_muito_forte_256bits_aqui
JWT_REFRESH_SECRET=sua_chave_refresh_muito_forte_diferente

# === Banco de Dados ===
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

# === E-mail (Nodemailer) ===
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=2525
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=sua_app_password_do_gmail

🗄️ Configurar Banco de Dados

# Gerar cliente Prisma
npx prisma generate

# Rodar migrações
npx prisma migrate dev

# Ou (para ambientes sem migrate)
npx prisma db push

▶️ Como Rodar

# Desenvolvimento 
npm run dev server.js

Servidor estará rodando em: http://localhost:8000


