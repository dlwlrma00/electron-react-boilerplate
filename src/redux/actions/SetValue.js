export default function SetValue (key, value, actionType) {
  if (arguments.length === 3) {
    // console.log(actionType, key, value);
    return {
      type: actionType.toUpperCase(),
      payload: {
        [key]: value
      }
    };
  } else if (arguments.length === 2 && typeof key === "object") {
    // console.log(arguments[1].toUpperCase(), key);
    if(arguments[0] && arguments[0].hasOwnProperty('_AD') && arguments[0]._AD){
      console.log('ADS LOADED FROM SET VALUE')
      arguments[0]._AD.load()
    }

    return {
      type: arguments[1].toUpperCase(),
      payload: key
    }
  } else {
    throw new Error("SetValue() only accept arguments as follow SetValue(key, value, actionType) or SetValue({key: value}, actionType)");
  }
};
