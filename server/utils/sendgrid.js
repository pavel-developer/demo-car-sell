const sgMail = require('@sendgrid/mail');
const { 
  emailConfig: { subject, from },
  emailLanguages,
  sellingMethodsText
} = require('./constants');

sgMail.setApiKey(process.env.API_KEY);

function buildMessage(to, html) {
  return { to, from, subject, html}
}

function languageHTMLOption(language, property, data) {
  return `<div>${emailLanguages[language][property]}: ${ data }</div>`
}

function buildHtml(data) {
  const {
    carColour,
    carPreviousOwners,
    carMileage,
    canDirectSale,
    carYear,
    carMake,
    carModel,
    consignPrice,
    dealerPrice,
    preferredSellingMethod
  } = data;
  let { language } = data;
  !Object.keys(emailLanguages).includes(language) && (language = 'English');

  let html = '<h1>Demo project sell details</h1>';
  html+= `<div>${ carYear || '' } ${ carMake || '' } ${ carModel || '' }</div>`;

  carColour && (html += languageHTMLOption(language, 'carColour', carColour));
  carPreviousOwners && (html += languageHTMLOption(language, 'carPreviousOwners', carPreviousOwners));
  carMileage && (html += languageHTMLOption(language, 'carMileage', carMileage));
  canDirectSale && (html += languageHTMLOption(language, 'canDirectSale', canDirectSale));
  consignPrice && (html += languageHTMLOption(language, 'consignPrice', consignPrice));
  dealerPrice && (html += languageHTMLOption(language, 'dealerPrice', dealerPrice));
  preferredSellingMethod && (html += languageHTMLOption(language, 'preferredSellingMethod', sellingMethodsText[preferredSellingMethod]));

  return html;
}

module.exports = {
  send: async (data) => {
    const html = buildHtml(data);
    const message = buildMessage(data.email, html);

    await sgMail.send(message);
  }
}
