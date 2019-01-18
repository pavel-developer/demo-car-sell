const { send } = require('../utils/sendgrid');

module.exports = {
  sendEmail: async (request, response) => {
    try {
      const { data } = request.body;
      await send(data);
      response.status(200).send('Success');
    } catch(e) {
      response.status(500).send('Server error');
    }
  }
}