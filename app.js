require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const app = express();

app.use(express.json());

app.use('/subscriptions', subscriptionRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});