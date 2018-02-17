"use strict";

/**
 * @extends JsLoggerInterface
 * @class JsLoggerFileAdapter
 */
const JsLoggerInterface = require('../JsLoggerInterface');

class JsLoggerFileAdapter extends JsLoggerInterface {

    /**
     * @constructor
     * @param {{logFilePath: string, level: string}} options
     */
    constructor(options = {}) {
        super(
            Object.assign({
                    level: JsLoggerInterface.levels().debug,
                    logFilePath: false,
                    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
                },
                options
            )
        );

        this._logger = require('simple-node-logger').createSimpleFileLogger(this._options);
        this._logger.setLevel(this._options.level);
        this._methodList = this._generateMethods();
    }

    /**
     * @inheritDoc
     */
    log(message, level) {
        if (this._methodList.hasOwnProperty(level)) {
            this._logger.setLevel(level);
            this._methodList[level](message);
        }
        return this;
    }

    /**
     *
     * @return {*}
     * @private
     */
    _generateMethods() {
        const _methodList = {};
        Object.keys(JsLoggerInterface.levels())
            .map(level => {
                _methodList[level] = new Function('message', 'this.' + level + '(message) ;')
                    .bind(this._logger);
            });

        return _methodList;
    }
}

module.exports = JsLoggerFileAdapter;
