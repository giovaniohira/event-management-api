const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo administrador
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({ message: 'Administrador criado com sucesso', user: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar administrador', error });
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Encontra o usuário
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Verifica se o usuário a ser excluído não é um administrador
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Não é permitido excluir um administrador.' });
      }
  
      // Exclui o usuário
      await user.destroy();
      res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao remover usuário', error });
    }
};
