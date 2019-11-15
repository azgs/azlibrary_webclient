global.config = require('./config/config.json');

global.pp = (object) => {
	return require('util').inspect(object, {depth:null, maxArrayLength: null});
};



const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const morgan = require('morgan');

global.args = require('commander');

global.args
	.version('0.0.1')
	.option('-p, --port <port>', 'Port to listen on', 4000)
	.option('-l, --loglevel <loglevel>', 'Indicates logging level (error, warn, info, verbose, debug, silly). Default is info.', 'info')
	.option('-s, --servicelevel <servicelevel>', 'Indicates service level (prod, stage, dev). Default is prod.', 'prod')
	.option('-h, --https <https>', 'Indicates whether to use https (true, false). Default is false.', 'false')
	.parse(process.argv);

const path = require("path");
const fs = require("fs-extra");
const logger = require("./logger")(path.basename(__filename));

const port = global.args.port;
logger.debug("port = " + global.pp(global.args.port));

const app = express();

app.use((req, res, next) => {
    req.getHostURL = function() {
      	return req.protocol + "://" + req.get('host'); //TODO: This might choke with query params
    }
    return next();
});

app.use(morgan('dev', {
    skip: (req, res) => {
        return res.statusCode < 400
    }, 
	//stream: { write: message => logger.info(message) }
	stream: process.stderr
}));

app.use(morgan('dev', {
    skip: (req, res) => {
        return res.statusCode >= 400
    }, 
	//stream: { write: message => logger.info(message) }
	stream: process.stdout
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const routes = require('./app.routes');

app.use('/', routes);

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
});
*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
  	next(err);
});

// development error handler
// will print stacktrace
if (global.args.servicelevel === 'dev') {
	logger.debug("dev error logging");
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
		  message: err.message,
		  error: err
		});
  	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	logger.debug("prod error logging");
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


let server;
if ("false" === global.args.https) {
	server = app.listen(port, function(){
		console.log('Example app listening on port ' + port);
	});
} else {
	if ("dev" === global.args.servicelevel) {
		server = https.createServer({
			key: fs.readFileSync(path.join('certs', 'dev', 'server.key')),
			cert: fs.readFileSync(path.join('certs', 'dev', 'server.cert'))
		}, app).listen(port, function(){
			console.log('Example app listening on port ' + port);
		});
	} else {
		throw new Error("prod encryption not implemented");
	}
}

server.timeout = 300000;  //five minutes

logger.silly("server.timeout = " + server.timeout);
