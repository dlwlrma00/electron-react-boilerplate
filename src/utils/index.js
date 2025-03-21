const IS_UNDEFINED = obj => typeof obj === "undefined";
const IS_EMPTY_STRING = obj => obj === "";
const IS_NULL = obj => obj === null;
const IS_LENGTH_ZERO = obj => obj.length === 0;
const IS_VALID = obj => !IS_UNDEFINED(obj) && !IS_NULL(obj) && !IS_EMPTY_STRING(obj);

const FILTER_NUMBER = (str, type) => {
    if(str.length > 0){
        if(!type || type == 'int'){
            let cleanStr = str.replace(/\D/g,'');
            return cleanStr
        }

        if(type == 'double') {
            let validNumber = new RegExp(/((?:\d+\.\d*)|(?:\d*\.?\d+))/);
            // /^[+-]?((\.\d+)|(\d+(\.\d+)|[.]\d+([eE][+-]?\d+)?))$/
            if(validNumber.test(str)){
                console.log('is valid float ', str)
                return str
            }else{
                // console.log('is invalid float ', str)
                return str.substring(0, str.length-1);
            }
        }
            
    }
}

const NUMBER_WITH_COMMAS = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FILTER_FLOAT = (val) => {

    let str = val
    let validNumber = new RegExp(/((?:\d+\.\d*)|(?:\d*\.?\d+))/);
    let vv = validNumber.exec(str)
    if(vv){
        // console.log(vv)
       return vv[0]
    }
}

const CAPITALIZE = (val) => {
    const arr = val.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    return str2;
}

const CAPITALIZE_FIRST_LETTER = (string) => {
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }else{
        return string
    }
    
}

const delay = ms => new Promise(res => setTimeout(res, ms));


module.exports = {
    IS_UNDEFINED,
    IS_EMPTY_STRING,
    IS_NULL,
    IS_VALID,
    IS_LENGTH_ZERO,
    FILTER_NUMBER,
    FILTER_FLOAT,
    NUMBER_WITH_COMMAS,
    CAPITALIZE,
    CAPITALIZE_FIRST_LETTER,
    delay
}
