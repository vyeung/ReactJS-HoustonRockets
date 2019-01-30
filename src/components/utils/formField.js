import React from 'react';
import "./formField.css";

const formField = (props) => {
  
  const showTemplate = () => {
    let template = null;

    if(props.fieldData.htmlTag === "input") {
      template = (
        <input 
          {...props.fieldData.config} 
          value={props.fieldData.value} 

          //return to changed, an object with event and myFieldType
          onChange={(event) => props.changed({event, myFieldType:props.fieldType})}
        />
      );
    }

    if(props.fieldData.htmlTag === "select") {
      template = (
        <select 
          value={props.fieldData.value}
          onChange={(event) => props.changed({event, myFieldType:props.fieldType})}
        >
          <option value="">{props.optionMsg ? props.optionMsg : "Select One"}</option>
          {
            props.fieldData.config.options.map((item) => (
              //key prop is required by map. value prop is what's sent to db
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))
          }
        </select>
      );
    }

    return template;
  }

  const showErrorMsg = () => {
    let errorMsg = (
      <div className="error_label">
        {/*when validation is required and valid=false*/}
        {props.fieldData.validation && props.fieldData.valid===false ? 
          props.fieldData.validationMsg : null }
      </div>
    );
    return errorMsg;
  }
  
  return (
    <div className="formField">
      {showTemplate()}
      {showErrorMsg()}
    </div>
  );
};

export default formField;