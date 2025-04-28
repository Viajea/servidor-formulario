const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para recibir el formulario
app.post('/api/formulario', async (req, res) => {
  const { firstname, email, phone, destino, tipo_viaje } = req.body;

  const hubspotUrl = 'https://forms.hubspot.com/uploads/form/v2/49665804/25b6e03b-e2bf-4a6a-9185-c707a6f6eebb';

  const hsContext = {
    hutk: '', 
    pageUri: 'https://viajea.github.io/viajea-click-landing/',
    pageName: 'Formulario de Viaje'
  };

  const formData = new URLSearchParams();
  formData.append('firstname', firstname);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('destino', destino);
  formData.append('tipo_viaje', tipo_viaje);
  formData.append('hs_context', JSON.stringify(hsContext));

  try {
    const response = await fetch(hubspotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (response.ok) {
      res.status(200).send('Formulario enviado a HubSpot');
    } else {
      res.status(500).send('Error al enviar a HubSpot');
    }
  } catch (error) {
    console.error('Error enviando a HubSpot:', error);
    res.status(500).send('Error del servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
{
  "name": "viajea-form-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "node-fetch": "^2.6.7"
  }
}
