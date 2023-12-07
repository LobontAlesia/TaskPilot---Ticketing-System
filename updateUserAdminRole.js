// Conectează-te la MongoDB utilizând Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// Importă modelul de utilizator
const User = require('C:\\Users\\Alesia\\Desktop\\Ticketing System\\models\\User.js');

// Conectare la MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Identifică și actualizează utilizatorul cu rolul de admin
User.updateOne({ email: "alesia.lobont03@e-uvt.ro" }, { $set: { isAdmin: true } })
  .then(result => {
    console.log(`Actualizare realizată cu succes: ${result}`);
  })
  .catch(error => {
    console.error(`Eroare la actualizare: ${error}`);
  })
  .finally(() => {
    // Închide conexiunea la baza de date
    mongoose.disconnect();
  });
