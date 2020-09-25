const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const db_config = require('./configs/db_config.json');
const todoRoutes = require('./routes/todos');

const PORT = process.env.PORT || 3000;
const db_uri = `mongodb+srv://${db_config.user}:${db_config.password}@cluster0.lyz54.mongodb.net/${db_config.dbname}`;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log('server has been started...');
    });
  } catch (e) {
    console.error(e);
  }
}

start();


