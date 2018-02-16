"use strict";

/**
 * @class JsLoggerInterface
 */
class JsLoggerInterface {
    constructor(options = {}) {
        /**
         *
         * @type {{trace: string, debug: string, info: string, warn: string, error: string, fatal: string}}
         * @private
         */
        this._levels = JsLoggerInterface.levels();
        this._options = require('extends').extends(
            {level: this._levels.debug,},
            options
        );
    }

    /**
     * @public
     * @return {{trace: string, debug: string, info: string, warn: string, error: string, fatal: string}}
     */
    static levels() {
        return {
            trace: 'trace',
            debug: 'debug',
            info: 'info',
            warn: 'warn',
            error: 'error',
            fatal: 'fatal',
        };
    }

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    trace(message) {
        return this.log(message, this._levels.trace);
    };

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    debug(message) {
        return this.log(message, this._levels.debug);
    };

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    info(message) {
        return this.log(message, this._levels.info);
    };

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    warn(message) {
        return this.log(message, this._levels.warn);
    };

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    error(message) {
        return this.log(message, this._levels.error);
    };

    /**
     * @public
     * @param {String} message
     * @return {JsLoggerInterface}
     */
    fatal(message) {
        return this.log(message, this._levels.fatal);
    };

    /**
     *
     * @param {String} level
     * @param {String} message
     * @abstract
     * @return {JsLoggerInterface}
     * @public
     */
    log(message, level = this._options.level) {
        return this;
    }
}
