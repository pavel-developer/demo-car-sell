const carSellRouter = require('./carSell');
const emailRouter = require('./email');

module.exports = (app) => {
  app.use('/api/carSell', carSellRouter);
  app.use('/api/email', emailRouter);
}