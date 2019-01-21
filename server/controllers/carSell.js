const { getById, updateById } = require('../utils/firestore');
const { notFoundMessage } = require('../utils/constants');

const collectionName = 'carSellListings';
const fieldsToUpdate = ['consignPrice', 'dealerPrice', 'preferredSellingMethod'];

module.exports = {
  getCarSell: async (request, response) => {
    try {
      const id = request.params.id
      const carSell = await getById(collectionName, id);
      if (!carSell) {
        throw new Error(notFoundMessage);
      }
      response.send(carSell)
    } catch(e) {
      const status = e.message.includes(notFoundMessage) ? 404 : 500;
      const error = e.message || 'Server error';

      response.status(status).send(error);
    }
  },
  updateCarSell: async (request, response) => {
    const id = request.params.id;
    const { data } = request.body;

    try {
      const carSell = await updateById(collectionName, id, data, fieldsToUpdate);
      if (!carSell) {
        throw new Error(notFoundMessage);
      }
      response.send(carSell)
    } catch(e) {
      const status = e.message.includes(notFoundMessage) ? 404 : 500;
      const error = e.message || 'Server error';

      response.status(status).send(error);
    }
  }
}
