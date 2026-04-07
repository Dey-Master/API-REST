// Deletar usuário (apenas para administradores)
/**
 * @swagger
 * /api/private/delete-user/{id}:
 *   delete:
 *     summary: Deletar usuário (apenas para administradores)
 *     description: Remove um usuário do sistema (apenas para administradores)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: string
 *           example: "8ce7675d-89b1-4234-acf1-95f01f8c8a70"
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               "message": "Usuario deletado com sucesso!"
 * 
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

 *       404:
*         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               "message": "Usuario não encontrado!"
*/



// Listar todos os usuários (apenas para administradores)
/**
 * @swagger
 * /api/private/users:
 *   get:
 *     summary: Retona dados de todos os usuários (apenas para administradores)
 *     description: Retorna uma lista de todos os usuários cadastrados no sistema, incluindo suas informações básicas (ID, nome, email e função)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "8ce7675d-89b1-4234-acf1-95f01f8c8a70"
 *               firstName: "Nome"
 *               lastName: "Sobrenome"
 *               email: "teste@gmail.com"
 *               role: "USER"
 * 
 *       401:
 *         description: Usuário não autorizado.
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuário não autenticado!"
 * 
 *       403:
 *         description: Acesso negado.
 *         content:
 *           application/json:
 *             example:
 *                  "message": "Acesso negado!"
 * 
 *       500:
 *         description: Erro interno ao verificar permissões.
 *         content:
 *           application/json:
 *            example:
 *              "message": "Erro interno ao verificar permissões!"
 */




// Perfil do usuário logado
/**
 * @swagger
 * /api/private/profile:
 *   get:
 *     summary: Retorna dados do usuário logado
 *     description: Retorna as informações do usuário autenticado com base no token JWT
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: "8ce7675d-89b1-4234-acf1-95f01f8c8a70"
 *               firstName: "Nome"
 *               lastName: "Sobrenome"
 *               email: "teste@gmail.com"
 *               role: "USER"
 *       400:
 *         description: Erro ao buscar dados do perfil.
 *         content:
 *           application/json:
 *            example:
 *              "message": "Erro ao buscar dados do perfil!"
 * 
 *       401:
 *         description: Token não fornecido.
 *         content:
 *           application/json:
 *             example:
 *               message: "Token não fornecido!"
 * 
 *       403:
 *         description: Acesso negado.
 *         content:
 *           application/json:
 *             example:
 *                  "message": "Acesso negado!"
*/

