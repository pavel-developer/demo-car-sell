const FirestoreHelper = require('../utils/firestore');
const { notFoundMessage } = require('../utils/constants');
const { sendMessage } = require('../utils/slack');

const firestore = new FirestoreHelper('carSellListings', (added) => added.forEach(sendMessage));

module.exports = {
  getCarSell: async (request, response) => {
    try {
      const id = request.params.id
      const carSell = await firestore.getById(id);
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
      const carSell = await firestore.updateById(id, data);
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
