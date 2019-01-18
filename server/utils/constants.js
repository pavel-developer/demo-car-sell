const firestoreConfigFields = [
  'type',
  'project_id',
  'private_key_id',
  'private_key',
  'client_email',
  'client_id',
  'auth_uri',
  'token_uri',
  'auth_provider_x509_cert_url',
  'client_x509_cert_url'
];

module.exports = {
  firestoreConfig: firestoreConfigFields.reduce((acc, field) => ({ ...acc, [field]: process.env[field] }), {}),
  notFoundMessage: 'Not Found',
  emailConfig: {
    from: 'demo@demo.demo',
    subject: 'Demo email'
  },
  emailLanguages: {
    English: {
      carColour: 'Car color',
      carPreviousOwners: 'Hand',
      carMileage: 'Mileage',
      canDirectSale: 'DS',
      consignPrice: 'Consign price',
      dealerPrice: 'Dealer price',
      preferredSellingMethod: 'Selling method'
    },
    Chienese: {
      carColour: '车的颜色',
      carPreviousOwners: '手',
      carMileage: '里程',
      canDirectSale: '直接销售',
      consignPrice: '托运价格',
      dealerPrice: '经销商价格',
      preferredSellingMethod: '销售方法'
    },
  },
  sellingMethodsText: {
    dealerOnly: 'Dealer only',
    consignOnly: 'Consign only',
    consignAndDealer: 'Consign + Dealer'
  }
}