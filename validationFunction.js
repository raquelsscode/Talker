 function Emptyemail(email) {
    if (email === undefined || email === ' ') {
        return true;
      } 
    return false;
  }

  function Validemail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
        return true;
      }
      return false;
  }
 
  function EmptyPassword(password) {
    if (password === undefined || password === ' ') {
   return true; 
  }
  return false;
  }

  function MinPassword(password) {
    if (password.length < 6) {
   return true; 
  }
  return false;
  }

  const validationToken = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  };

  const validationName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) { 
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    }
  
    next();
  };

  const validationAge = (req, res, next) => {
    const { age } = req.body;
    const integerNumber = Number.isInteger(age);
  
    if (!age || integerNumber === false) { 
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
    next();
  };

  const validationTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) { 
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
  };

  const validationWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])(\/)(0?[1-9]|1[012])(\/)\d{4}$/;
    const validDate = dateRegex.test(watchedAt);
  
    if (!watchedAt) { 
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!validDate) {
      return res.status(400).json({ 
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };

  const validationRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
  };

  module.exports = {
    Emptyemail,
    Validemail,
    EmptyPassword,
    MinPassword,
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationWatchedAt,
    validationRate, 
  };