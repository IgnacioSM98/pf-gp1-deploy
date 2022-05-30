const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-1918641065628898-052614-ddfbd48126d3b2fab54ccd4a8a2f79db-302032758",
});

module.exports = {
  mercadopago,
};
