const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const growthbookUrl = 'https://api.growthbook.io/api/v1/features/button-counter/toggle';
const token = 'secret_S8JpuqCB2kcXPHIC225RYpP5j6S38REAhprGNeM5byU';

app.post('/rollbar', (req, res) => {
  console.log('Received Rollbar webhook', req.body);

  axios.post(growthbookUrl, {
    environments: {
      production: false
    },
    reason: 'Kill switch activated'
  }, {
    auth: {
      username: token,
      password: ''
    }
  })
    .then((response) => {
      console.log('Growthbook API call successful', response.data);
    })
    .catch((error) => {
      console.error('Error making Growthbook API call', error);
    });

  res.sendStatus(200);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
