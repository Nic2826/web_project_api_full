function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  let message;
  if (statusCode === 400) message = 'Solicitud inválida';
  else if (statusCode === 401) message = 'No autorizado';
  else if (statusCode === 404) message = 'Recurso no encontrado';
  else if (statusCode === 500) message = 'Ha ocurrido un error en el servidor';
  else message = err.message;

  res.status(statusCode).json({ message });

  console.error(err.stack); // Log detallado para desarrolladores
}

module.exports = errorHandler;