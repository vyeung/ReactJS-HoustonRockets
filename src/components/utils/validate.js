/*this function takes a fieldType object and checks whether the value entered into
the field is valid or not based on its validation requirements.*/

const validate = (fieldType) => {

  //assume everything about the fieldType is OK, so no error message
  let isErrorFree = [true, ""];
  
  let isValid;
  let message;

  if(fieldType.validation.date) {
    //regex for MM-DD-YYYY
    const pattern = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-((19|20|21)\d{2})$/;

    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Not in specified format: MM-DD-YYYY";
    }

    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  if(fieldType.validation.letters) {
    //regex for letters only
    const pattern = /^[a-zA-Z]+$/;

    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Only letters allowed";
    }

    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  if(fieldType.validation.number) {
    //regex for whether input is a valid number
    const pattern = /^[0-9]+$/; 

    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Invalid number";
    }

    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  if(fieldType.validation.numOrDash) {
    //regex for whether input is a valid number or just one dash
    const pattern = /^([0-9]+|[-]{1})$/; 

    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Not a valid number or single -";
    }

    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }
  
  if(fieldType.validation.email) {
    //regex for checking whether input is a valid email
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    if(pattern.test(fieldType.value) === true) {
      isValid = true;
      message = "";
    }
    else {
      isValid = false;
      message = "Invalid email";
    }
    //depending on isValid value, isErrorFree=[isValid, message] or what's currently stored in line 7
    isErrorFree = isValid===false ? [isValid, message] : isErrorFree;
  }

  //the last if check is the most global regarding when its message is displayed
  if(fieldType.validation.required) {
    if(fieldType.value.trim() === "") {
      isValid = false;
      message = "Field Required";
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