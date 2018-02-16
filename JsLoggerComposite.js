"use strict";

/**
 * @extends LoggerInterface
 * @class JsLoggerComposite
 */
class JsLoggerComposite extends LoggerInterface {

    /**
     *
     * @constructor
     * @param {LoggerInterface[]} loggers
     */
    constructor(loggers = []) {
        super();
        /**
         *
         * @type {LoggerInterface[]}
         * @private
         */
        this._children = [];
        loggers.forEach(logger => this.append(logger));
    }

    /**
     * @public
     * @param {LoggerInterface} logger
     * @return {JsLoggerComposite}
     */
    append(logger) {
        this._children.push(logger);
        return this;
    }

    log(message, level = LoggerInterface.levels().debug) {
        this._children.forEach(logger => logger.log(message, level));
        return this;
    }
}

module.exports = JsLoggerComposite;
