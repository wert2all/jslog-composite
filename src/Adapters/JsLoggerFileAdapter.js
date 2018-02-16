"use strict";

/**
 * @extends JsLoggerInterface
 * @class JsLoggerFileAdapter
 */
const JsLoggerInterface = require('../JsLoggerInterface');

class JsLoggerFileAdapter extends JsLoggerInterface {

    /**
     * @constructor
     * @param {{filename: string, level: string}} options
     */
    constructor(options = {}) {
        options = Object.assign({
            filename: false,
            level: JsLoggerInterface.levels().debug,
        }, options);
        super(options);
        const log4js = require('log4js');
        log4js.configure({
            appenders: {default: {type: 'file', filename: this._options.filename}},
            categories: {default: {appenders: ['default'], level: this._options.level}}
        });
        this._logger = log4js.getLogger('default');

        this._methodList = {};
        Object.keys(JsLoggerInterface.levels())
            .map(level => {
                this._methodList[level] = new Function('message', 'this._logger.' + level + '(message) ;').bind(this);
            });
    }

    /**
     * @inheritDoc
     */
    log(message, level) {
        if (this._methodList.hasOwnProperty(level)) {
            this._methodList[level](message);
        }
        return this;
    }
}

module.exports = JsLoggerFileAdapter;
