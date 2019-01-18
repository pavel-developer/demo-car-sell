const axios = require('axios');

module.exports = {
  sendMessage: ({ id }) => {
    axios.post(process.env.CHANNEL_HOOK, {
      text: `https://demo-car-sell.now.sh/car/${id}`
    }).catch(() => console.log('Sending message to Slack failed'));
  }
}
