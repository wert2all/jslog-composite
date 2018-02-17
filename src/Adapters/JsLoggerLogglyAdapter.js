"use strict";

/**
 * @extends JsLoggerInterface
 * @class JsLoggerLogglyAdapter
 */
const JsLoggerInterface = require('../JsLoggerInterface');

class JsLoggerLogglyAdapter extends JsLoggerInterface {

    /**
     * @constructor
     * @param {{logFilePath: string, level: string}} options
     */
    constructor(options = {}) {
        super(options);
        this._loggly = require('winston');
        require('winston-loggly-bulk');
        this._loggly.add(this._loggly.transports.Loggly, this._options);
    }

    /**
     * @inheritDoc
     */
    log(message, level) {
        this._loggly.log(level, message);
        return this;
    }
}

module.exports = JsLoggerLogglyAdapter;
