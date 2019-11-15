const path = require("path");
const logger = require("./logger")(path.basename(__filename));

const express = require('express');
const router = express.Router();

//CORS all around! (TODO: I hear there's an app for this now)
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index',{ title: "'sup?"});
});

const clientRouter = require('./client/client.routes');
router.use('/', clientRouter);


module.exports = router;
