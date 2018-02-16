"use strict";

const JsLoggerComposite = require('../src/JsLoggerComposite');
const JsLoggerFileAdapter = require('../src/Adapters/JsLoggerFileAdapter');

const logger = new JsLoggerComposite();
const fileLoggerTMP = new JsLoggerFileAdapter({filename: 'tmp.log'});
const fileLoggerDebug = new JsLoggerFileAdapter({filename: 'debug.log'});

logger.append(fileLoggerTMP)
    .append(fileLoggerDebug)
    .error('test ERROR');
