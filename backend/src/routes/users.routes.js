import { Router } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import { eq } from 'drizzle-orm';
import { userSchema, userUpdateSchema } from '../schemas/user.schema.js';
import { validateRequest } from '../middlewares/validate-request.js';

const router = Router();

// OBTER todos os usuários
// Esta rota retorna uma lista completa de todos os usuários cadastrados no sistema
router.get('/', async (req, res) => {
  try {
    // ISSO É EQUIVALENTE à consulta SQL: SELECT * FROM users;
    // Seleciona todos os registros da tabela de usuários sem filtros
    const allUsers = await db.select().from(users);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// OBTER usuário por ID
// Esta rota busca um usuário específico com base no ID fornecido na URL
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Formato de ID inválido' });
      return;
    }
    
    // ISSO É EQUIVALENTE à consulta SQL: SELECT * FROM users WHERE id = id;
    // Seleciona um usuário específico filtrando pelo ID fornecido
    const user = await db.select().from(users).where(eq(users.id, id));
    
    if (user.length === 0) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    
    res.status(200).json(user[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// CRIAR novo usuário
// Esta rota cria um novo registro de usuário com os dados fornecidos no corpo da requisição
router.post('/', validateRequest(userSchema), async (req, res) => {
  try {
    // ISSO É EQUIVALENTE à consulta SQL: INSERT INTO users (name, email, avatar, role, status) VALUES (req.body.name, req.body.email, req.body.avatar, req.body.role, req.body.status);
    // Insere um novo registro na tabela de usuários com os valores fornecidos no corpo da requisição
    const result = await db.insert(users).values(req.body).$returningId()  

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    // Verifica se o erro é de email duplicado
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Email já existe' });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
});

// ATUALIZAR usuário
// Esta rota atualiza os dados de um usuário existente com base no ID fornecido
router.put('/:id', validateRequest(userUpdateSchema), async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Formato de ID inválido' });
      return;
    }
    
    // Verifica se o usuário existe
    // ISSO É EQUIVALENTE à consulta SQL: SELECT * FROM users WHERE id = id;
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    
    if (existingUser.length === 0) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    
    // Atualiza os dados do usuário
    // ISSO É EQUIVALENTE à consulta SQL: UPDATE users SET ... WHERE id = id;
    await db.update(users)
      .set({
        ...req.body,
        updatedAt: new Date()
      })
      .where(eq(users.id, id));
    
    // Busca o usuário atualizado para retornar na resposta
    const updatedUser = await db.select().from(users).where(eq(users.id, id));
    
    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    
    // Verifica se o erro é de email duplicado
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Email já existe' });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
});

// EXCLUIR usuário
// Esta rota remove um usuário do sistema com base no ID fornecido
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'Formato de ID inválido' });
      return;
    }
    
    // Verifica se o usuário existe antes de tentar excluir
    const existingUser = await db.select().from(users).where(eq(users.id, id));
    
    if (existingUser.length === 0) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    
    // ISSO É EQUIVALENTE à consulta SQL: DELETE FROM users WHERE id = id;
    // Remove o registro do usuário da tabela
    await db.delete(users).where(eq(users.id, id));
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
