/* eslint-disable max-len */

// Importamos las funciones de Firebase
const functions = require("firebase-functions");

// Importamos Express
const express = require("express");

// Importamos el middleware Cors
const cors = require("cors");

// Importamos nodemailer
const nodemailer = require("nodemailer");

// Importamos Stripe y la clave secreta
const stripe = require("stripe")("sk_test_51P9XZ9CP02vDN9DMvZOqNVe5nyCr3LCE1NkuzwpzCYPVBLuXdnEyKRKWJSsNfL5bTjjUU2Fr6Z4C1tqT5NXcDUDE00uULDRrBV");

// Instanciamos Express
const app = express();

// Usamos las funciones middleware cors para permitir las
// solicitudes sin importar el origen y también para analizar solicitudes con cuerpos JSON

app.use(cors({origin: true}));
app.use(express.json());

// Creamos el transporte de nodemailer para el envio de mails mediante hotmail
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "sturdyyyproject@outlook.com",
    pass: "Dukeso14",
  },
});


// Extrae el correo, si no hay responde con un error
app.post("/send-email", (req, res) => {
  const {email} = req.body;
  if (!email) {
    res.status(400).json({message: "Email is required"});
    return;
  }

  // Configuramos el correo en cuestion
  const mailOptions = {
    from: "Sturdyyy Project <sturdyyyproject@outlook.com>",
    to: email,
    subject: "Your 10% Discount Code",
    text: "Here is your discount code: STURDYYY10. Enjoy your shopping!",
  };

  // Creamos el envío, en caso de no enviarse nos proporciona un mensaje de error
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({message: "Error sending email"});
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({message: "Email sent"});
    }
  });
});

// Convertimos los articulos del checkout al formato para Stripe
app.post("/checkout", async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: [item.images],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  // creamos la sesión de de pago con Stripe con los items, el metodo de pago y las urls de exito y cancelacion
  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: "https://sturdyyyproject-2207.web.app/success.html",
    cancel_url: "https://sturdyyyproject-2207.web.app/cancel.html",
  });

  res.status(200).json(session);
});

// Obtiene el estado de la sesion de Stripe y responde con el mail y el estado de la cuenta
app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

exports.api = functions.https.onRequest(app);
