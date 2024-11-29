const Card = require('../models/card');

// Definición de códigos de error
const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_SERVER_ERROR = 500;

async function getCards(req, res) {
  try{
    const cards = await Card.find({});
  res.send(cards);
}catch (err) {
  next(err);
}
}

async function createCards(req, res) {
  try{const newCard = await Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id
  });
  res.send(newCard);
  }
  catch (err) {
    next(err); }
}

async function deleteCardById(req, res) {
  try {
    const card = await Card.findByIdAndDelete(req.params.id).orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa ID");
      error.statusCode = ERROR_CODE_NOT_FOUND; // Establecer un código de estado 404
      throw error; // Arrojar el error para que sea manejado en el bloque catch
    });

    await Card.findByIdAndDelete(card._id); // Eliminar la tarjeta si se encontró

    res.send({ message: 'Tarjeta eliminada exitosamente' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCards, createCards, deleteCardById };

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id se volverá accesible
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // elimina _id del array
  { new: true },
)