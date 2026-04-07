
// Registrar os usuarios e autenticação
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário.
 *     description: Cria uma nova conta de usuário com as informações fornecidas
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "nome"
 *               lastname:
 *                 type: string
 *                 example: "sobrenome"
 *               email:
 *                 type: string
 *                 example: "teste@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Senha123@"
 *     responses:
 *       201:
 *         description: Registro de usuário.
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário criado com sucesso!"
 *       401:
 *         description: O e-mail encontra-se em uso.
 *         content:
 *           application/json:
 *             example:
 *               message: "O e-mail já está registrado no sistema!"
*/



// Login do usuário e geração de token JWT
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Valida as credenciais e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Senha123@"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: "Login realizado com sucesso!"
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               "user": {
 *                  "id": "8ce7675d-89b1-4234-acf1-95f01f8c8a70",
 *                  "firstname": "Nome",
 *                  "lastname": "Sobrenome",
 *                  "email": "teste@gmail.com",
 *                  "role": "USER"
 *               }
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             example:
 *               message: "Credenciais inválidas"
 *       429:
 *        description: Muitas tentativas de login.
 *        content:
 *           application/json:
 *             example:
 *               message: "Muitas tentativas de login. Tente novamente mais tarde."
*/



// Refresh token para obter um novo access token
/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Gera um novo access token
 *     description: Usa o refresh token para gerar um novo access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Novo token gerado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *                  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Token não encontrado ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               message: "Token inválido."
 *       403:
 *         description: Refresh token inválido.
 *         content:
 *           application/json:
 *             example:
 *                  "message": "Forbidden."
*/



// Esqueci minha senha e reset de senha
/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Solicita redefinição de senha
 *     description: Envia um email com link para redefinir a senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "teste@gmail.com"
 *     responses:
 *       200:
 *         description: Email enviado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "E-mail de redefinição enviado!"
 *       404:
 *         description: Email não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               "message": "Se o e-mail existir, enviaremos instruções."
*/




// Redefinir senha usando o token enviado por email
/**
 * @swagger
 * /api/reset-password/{token}:
 *   put:
 *     summary: Redefine a senha
 *     description: Altera a senha do usuário usando o token enviado por email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "c18d9c37f206af25efe5605ac2c25e681c1fb238c30af531a5106ff5e1d02513"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: "NovaSenha123@"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: "Senha redefinida com sucesso"
 *       401:
 *         description: Token não fornecido.
 *         content:
 *           application/json:
 *             example:
 *               message: "Token não fornecido!"
 * 
 *       403:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             example:
 *                  "message": "Token inválido!"
 */




// Logout do usuário
/**
 * @swagger
 * /api/private/logout:
 *   post:
 *     summary: Realiza logout
 *     description: Invalida o refresh token e encerra a sessão do usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               "message": "Logout realizado com sucesso."
 *       401:
 *         description: Token não fornecido.
 *         content:
 *           application/json:
 *             example:
 *               "message": "Token não fornecido."
 *       403:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             example:
 *               "message": "Token inválido."
*/


