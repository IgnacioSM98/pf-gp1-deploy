import axios from "axios";
import React, { useCallback, useEffect } from "react";

const FORM_ID = "payment-form";

export default function MercadoPagoIntegracion() {
  const obtenerPreference = useCallback(async () => {
    const res = await axios.post(
      "https://proyecto-final-gp1.herokuapp.com/pagar"
    );

    if (res.data) {
      const script = document.createElement("script");

      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", res.data);

      const form = document.getElementById(FORM_ID);

      form.appendChild(script);
    }
  }, []);

  useEffect(() => {
    obtenerPreference();
  }, [obtenerPreference]);

  return <form id={FORM_ID} method="GET" />;
}
