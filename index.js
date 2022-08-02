const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { getTalkers } = require('./APITalkers');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  const noTalkers = [];
  if (talkers.length === 0) {
    return res.status(200).json(noTalkers);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talker = talkers.find((talkerId) => talkerId.id === +id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
