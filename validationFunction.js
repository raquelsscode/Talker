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

  module.exports = {
    Emptyemail,
    Validemail,
    EmptyPassword,
    MinPassword,
  };