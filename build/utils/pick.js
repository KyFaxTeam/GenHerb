"use strict";
/**
  * Selected specific keys on a object
  *
  * @param {Object} object    -  The object source
  * @param {any[]} properties -  The keys to pick
  * @returns {Object}         -  The new object
  */
Object.defineProperty(exports, "__esModule", { value: true });
// ! The type of object parameter must be <Object>
const pick = (object, properties) => {
    return properties.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, 
    // initial obj is empty @Object
    {});
};
exports.default = pick;
