// Todo este código es el realizado para que la función del mail funcionara desde el localhost.
// Una vez tuve que exportar la web al hosting este código paso a la carpeta functions.
// Por ello puede haber cambios en el mismo

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'sturdyyyproject@outlook.com',
    pass: 'Dukeso14'
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('Error with the email transporter configuration:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

app.post('/send-email', (req, res) => {
  console.log('Headers:', req.headers);
  console.log('Request body raw:', req.body);

  const { email } = req.body;
  console.log('Received email:', email);

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  const mailOptions = {
    from: 'Sturdyyy Project <sturdyyyproject@outlook.com>',
    to: email,
    subject: 'Your 10% Discount Code',
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <h2>Your 10% Discount Code</h2>
      <p>Here is your discount code: <strong>STURDYYY10</strong></p>
      <p>Enjoy your shopping!</p>
      <div style="margin-top: 20px;">
        <a href="https://sturdyyyproject-2207.web.app/" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Shop Now</a>
      </div>
    </div>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
