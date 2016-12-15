const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
var ejs = require('ejs');
var app = express();
const path = require('path');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
const apiRouter = express.Router();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

let script_src = '../public/bundle.js';
if (process.env.NODE_ENV === 'development') {
  script_src = `${process.env.WEBPACK_DEV_SERVER}/bundle.js`;
}

let wish_controller = require("./controllers/wish_controller");
let user_controller = require("./controllers/user_controller");
let complain_controller = require("./controllers/complain_controller");

let check_cookie = user_controller.check_cookie;
apiRouter.use(cookieParser("cookieHasher"));

apiRouter.post('/register', jsonParser, user_controller.register);
apiRouter.post('/login', jsonParser, user_controller.login);

apiRouter.post('/wish', jsonParser, wish_controller.create);
apiRouter.get('/wish', wish_controller.index);

apiRouter.post('/complain', check_cookie, jsonParser, complain_controller.create);
apiRouter.get('/complain', jsonParser, complain_controller.index);
apiRouter.get('/complain/:id', jsonParser, complain_controller.show);
apiRouter.patch('/complain/:id', check_cookie, jsonParser, complain_controller.update);
apiRouter.delete('/complain/:id', check_cookie, jsonParser, complain_controller.destroy);

app.use("/api", apiRouter);

app.get('*', function(req, res) {
  res.render('index', {
    script_src
  });
});
module.exports = app;