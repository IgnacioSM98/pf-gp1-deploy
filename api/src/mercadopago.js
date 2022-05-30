const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-6754591265711414-052619-3c23adbd4954a9c9689daaa8dac84868-142937454",
});

module.exports = {
  mercadopago,
};
