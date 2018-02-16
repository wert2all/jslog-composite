"use strict";

const JsLoggerComposite = require('../src/JsLoggerComposite');
const JsLoggerFileAdapter = require('../src/Adapters/JsLoggerFileAdapter');

const logger = new JsLoggerComposite([
    new JsLoggerFileAdapter({logFilePath: 'tmp.log'}),
    new JsLoggerFileAdapter({logFilePath: 'debug.log'}),
]);

logger.error('this is error message.')
    .debug('this is debug message');
