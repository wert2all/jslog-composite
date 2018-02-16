"use strict";

/**
 * @extends JsLoggerInterface
 * @class JsLoggerComposite
 */
class JsLoggerComposite extends JsLoggerInterface {

    /**
     *
     * @constructor
     * @param {JsLoggerInterface[]} loggers
     */
    constructor(loggers = []) {
        super();
        /**
         *
         * @type {JsLoggerInterface[]}
         * @private
         */
        this._children = [];
        loggers.forEach(logger => this.append(logger));
    }

    /**
     * @public
     * @param {JsLoggerInterface} logger
     * @return {JsLoggerComposite}
     */
    append(logger) {
        this._children.push(logger);
        return this;
    }

    log(message, level = JsLoggerInterface.levels().debug) {
        this._children.forEach(logger => logger.log(message, level));
        return this;
    }
}

module.exports = JsLoggerComposite;
