const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-1918641065628898-052614-9266360da433418c0f7d1b284fcbec91-302032758",
});

module.exports = {
  mercadopago,
};
