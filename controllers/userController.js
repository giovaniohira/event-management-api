const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Cadastro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, isAdmin: false });
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.parent.detail });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(400).json({ error: error.parent.detail });
  }
};

exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;
  
      // Verifica se o usuário existe
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      // Verifica se o usuário que está tentando atualizar é o mesmo ou se é um administrador
      if (userId != req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permissão negada.' });
      }
  
      // Atualiza os dados do usuário
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      res.status(200).json({ message: 'Dados atualizados com sucesso.', user });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar dados', error });
    }
};