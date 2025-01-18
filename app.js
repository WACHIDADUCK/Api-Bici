var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bicicletasAPIRouter = require('./routes/api/bicicletas'); 


var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Api Bicicletas",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID del usuario",
            },
            nombre: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              description: "Email del usuario",
            },
          },
        },
        Bicicleta: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID de la bicicleta",
            },
            nombre: {
              type: "string",
              description: "Nombre de la bicicleta",
            },
            descripcion: {
              type: "string",
              description: "Descripción de la bicicleta",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene la página de inicio
 *     description: Obtiene la página de inicio de la aplicación
 *     responses:
 *       200:
 *         description: Página de inicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de respuesta
 */
app.use('/', indexRouter);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios
 *     description: Obtiene una lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.use('/users', usersRouter);

/**
 * @swagger
 * /api/bicicletas:
 *   get:
 *     summary: Obtiene una lista de bicicletas
 *     description: Obtiene una lista de bicicletas
 *     responses:
 *       200:
 *         description: Lista de bicicletas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bicicleta'
 */
app.use('/api/bicicletas', bicicletasAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
