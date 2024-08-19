require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const installRoutes = require('./routes/installRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');
const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/install', installRoutes);
app.use('/reports', reportRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});