"use strict";

const JsLoggerComposite = require('../src/JsLoggerComposite');
const JsLoggerFileAdapter = require('../src/Adapters/JsLoggerFileAdapter');
const JsLoggerLogglyAdapter = require('../src/Adapters/JsLoggerLogglyAdapter');

const logger = new JsLoggerComposite([
    new JsLoggerFileAdapter({logFilePath: 'tmp.log'}),
    new JsLoggerLogglyAdapter({
        token: "loggly-token",
        subdomain: "logly-domain",
        tags: ["tag"],
        json: false
    }),
]);

logger.error('this is error message.')
    .debug('this is debug message');
