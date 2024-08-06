

// Este codigo fue tras la importación de la biblioteca de Stripe
// Se desarrolló el código para trabajar con el LocalHost.
// Se realizaron cambios tras crear el hosting pero lo migramos al functions que es donde está el definitivo.
// Para ver el funcional redirigirse al código que se encuentra en el functions.
// La carpeta public dentro de stripe-server es parte de la biblioteca que Stripe adhiere al proyecto al importarla.

const stripe = require('stripe')('sk_test_51P9XZ9CP02vDN9DMvZOqNVe5nyCr3LCE1NkuzwpzCYPVBLuXdnEyKRKWJSsNfL5bTjjUU2Fr6Z4C1tqT5NXcDUDE00uULDRrBV');
const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cors({
  origin: true
}));

const YOUR_DOMAIN = 'https://sturdyyyproject-2207.web.app';

app.post('/checkout', async (req, res) => {
  const items = req.body.items.map((item)=>{
    return {
      price_data: {
        currency:"eur",
        product_data: {
          name: item.name,
          images: [item.images]
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`

  });

  res.status(200).json(session);
});

app.get('/session-status', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

exports.api = functions.https.onRequest(app);


