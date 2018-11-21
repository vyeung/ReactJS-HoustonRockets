/*this function takes a fieldType object and checks whether the value entered into
the field is valid or not based on its validation requirements.*/

const validate = (fieldType) => {

  //assume everything about the fieldType is OK, so no error message
  let isErrorFree = [true, ""];
  
  let isValid;
  let message;

  if(fieldType.validation.email) {
    //regex for checking whether input is a valid email
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Must be a valid email";
    }
    //depending on isValid value, isErrorFree=[isValid, message] or what's currently stored in line 7
    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  //the last if check is the most global regarding when its message is displayed
  if(fieldType.validation.required) {
    if(fieldType.value.trim() === "") {
      isValid = false;
      message = "This field is required";
    }
    else {
      isValid = true;
      message = "";
    }
    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  return isErrorFree;
};

export default validate;