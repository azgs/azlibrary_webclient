const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');

const pFormat = format.printf(info => {
	return `${info.timestamp} (${info.level.toUpperCase()}) ${info.message}`;
});


const logger = createLogger({
	level: global.args.loglevel,
  	format: format.combine(
		format.timestamp(),
		//format.prettyPrint()
		pFormat
  	),
  	transports: [
		new transports.Console(),
		new transports.DailyRotateFile({
			dirname: '/tmp/azlibrary/logs/webclient',
			filename: 'azlibrary_webclient-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true
		})

	]
});

module.exports = function(fileName) {    
    var myLogger = {
        error: function(text) {
            logger.error(fileName + ': ' + text)
        },
        warn: function(text) {
            logger.warn(fileName + ': ' + text)
        },
        info: function(text) {
            logger.info(fileName + ': ' + text)
        },
        debug: function(text) {
            logger.debug(fileName + ': ' + text)
        },
        silly: function(text) {
            logger.silly(fileName + ': ' + text)
        }
    }

    return myLogger
}
