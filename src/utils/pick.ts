 /**
  * Selected specific keys on a object
  * 
  * @param {Object} object    -  The object source
  * @param {any[]} properties -  The keys to pick
  * @returns {Object}         -  The new object
  */

// ! The type of object parameter must be <Object>

const pick = ( object:any, properties:any[]): object => {
   return properties.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, 
    // initial obj is empty @Object
    {})
} 
export default pick ;