require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { login, createUser } = require('./controllers/user');
const { validateCreateUser, validateLogin } = require('./middlewares/validate');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
const { PORT = 3001, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;

const app = express();
app.get('/', (req, res) => {
  res.send('test');
});

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);
app.use(helmet());
app.use(cookieParser()); // для извлечения данных из cookies
app.use(express.json());
app.use(cors);
app.use(requestLogger); // подключаем логгер запросов
// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// роуты
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((req, res, next) => next(new NotFoundError('Такой страницы не существует')));

// централизованная обработка ошибок
app.use((err, req, res) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
