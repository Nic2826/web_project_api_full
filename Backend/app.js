const cors = require('cors');
const {auth} = require('./middleware/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const {loginUsers, createUsers} = require('./controllers/users');
const errorHandler = require('./middleware/errorHandler');
const {errors} = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');

// 2. Logger de solicitudes
app.use(requestLogger);

// 1. Primero las configuraciones básicas
app.use(cors());
app.options('*', cors());
app.use(express.json());



// 3. Ruta de prueba para error
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// 4. Rutas públicas (no requieren autenticación)
app.post('/signup', createUsers);
app.post('/signin', loginUsers);

// 5. Middleware de autenticación
app.use(auth);

// 6. Configuración de usuario de prueba
app.use((req, res, next) => {
  req.user = {
    _id: '67200dd2a9ca0d3e2980c321'
  };
  next();
});

// 7. Rutas protegidas
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// 8. Ruta 404
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

// 9. Logger de errores
app.use(errorLogger);

// 10. Manejo de errores de celebrate
app.use(errors());

// 11. Manejador de errores central
app.use(errorHandler);

// 12. Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('conectado a la base de datos');
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });

// 13. Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});