"use strict";

/**
 * @extends JsLoggerInterface
 * @class JsLoggerComposite
 */
const JsLoggerInterface = require('./JsLoggerInterface');

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
        Promise
            .all(
                this._children.map(
                    logger => new Promise(
                        resole => resole(logger.log(message, level))
                    )
                )
            )
            .catch(err => err);
        return this;
    }
}

module.exports = JsLoggerComposite;
