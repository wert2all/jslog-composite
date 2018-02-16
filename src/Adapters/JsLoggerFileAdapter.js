"use strict";

/**
 * @class JsLoggerFileAdapter
 */
class JsLoggerFileAdapter extends JsLoggerInterface {

    constructor(options = {}) {
        options.filename = false;
        options.level = JsLoggerInterface.levels().debug;
        super(options);
        const log4js = require('log4js');
        log4js.configure({
            appenders: {default: {type: 'file', filename: this._options.filename}},
            categories: {default: {appenders: ['default'], level: this._options.level}}
        });

        this._logger = log4js.getLogger('default');
    }

    /**
     * @inheritDoc
     */
    log(message, level) {
        this._logger.call(this, level, message);
        return this;
    }
}
