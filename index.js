const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getTalkers, setTalkers } = require('./APITalkers');
const { Emptyemail,
        Validemail,
        EmptyPassword,
        MinPassword,
        validationToken,
        validationName,
        validationAge,
        validationTalk,
        validationWatchedAt,
        validationRate,
      } = require('./validationFunction');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validationToken, async (req, res) => {
  const talkers = await getTalkers();
  const { q } = req.query;
  const result = talkers.filter((talkerName) => talkerName.name.includes(q));

  if (q === '' || !q) {
    return res.status(200).json(talkers);
  }
  if (!result) {
    return res.status(200).json([]);
  }
  res.status(200).json(result);
});

app.get('/talker', async (_req, res) => {
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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');

  if (Emptyemail(email)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }  
  if (Validemail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (EmptyPassword(password)) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } 
  if (MinPassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});

app.use(validationToken);

app.delete('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;

  const teste = talkers.filter((index) => index.id !== Number(id));
  await setTalkers(teste);
  console.log(talkers);

  res.status(204).end();
});

app.use(validationToken);
app.use(validationName);
app.use(validationAge);
app.use(validationTalk);
app.use(validationWatchedAt);
app.use(validationRate);

app.post('/talker', async (req, res) => {
  const talkers = await getTalkers();
  const id = talkers.length + 1;
  const newTalker = { id, ...req.body };
  talkers.push(newTalker);
  await setTalkers(talkers);

  res.status(201).json(newTalker);
});

app.put('/talker/:id', async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  const intId = Number(id);
  const talkerIndex = talkers.findIndex((person) => person.id === intId);
  talkers[talkerIndex] = { id: intId, ...req.body };
  await setTalkers(talkers);

  res.status(200).json(talkers[talkerIndex]);
});

app.listen(PORT, () => {
  console.log('Online');
});
