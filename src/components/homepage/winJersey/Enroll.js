import React, { Component } from 'react';
import "./winJersey.css";

import FormField from "../../utils/formField";
import validate from "../../utils/validate";
import { firebasePromotion } from "../../../firebase";

class Enroll extends Component {

  state = {
    formError: false,
    formSubmitMsg: "",
    enrollForm: {
      email: {
        htmlTag: "input",
        value: "",
        config: {
          name: "email_input",
          placeholder: "Email..."
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMsg: ""
      }
    }
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {email: this.state.enrollForm.email.value};

    if(this.state.enrollForm.email.valid === true) {
      //check if entered email is already in database
      firebasePromotion.orderByChild("email").equalTo(dataToSubmit.email).once("value")
        .then((snapshot) => {
          //email isn't in database, so push it and reset form
          if(snapshot.val() === null) {
            firebasePromotion.push(dataToSubmit);
            this.resetFormHandler(true);
          }
          //email is in database, so just reset form
          else {
            this.resetFormHandler(false);
          }
        })
    }
    else {
      const updatedForm = {...this.state.enrollForm};
      updatedForm.email.validationMsg = "Please submit a vaild email";
      this.setState({
        formError: true,
        enrollForm: updatedForm,
      });
    }
  }

  resetFormHandler = (bool) => {
    const updatedForm = {...this.state.enrollForm};

    //reset 3 items on a form submit
    for(var key in updatedForm) {
      updatedForm[key].value = "";
      updatedForm[key].valid = false;
      updatedForm[key].validationMsg = "";
    }
    this.setState({
      formError: false,
      enrollForm: updatedForm,
      formSubmitMsg: bool ? "Email successfully added!" : "Email already added. Try another one."
    });

    //clear submit message after 4s
    setTimeout(() => {
      this.setState({formSubmitMsg: ""});
    }, 4000);
  }

  updateFormHandler = (elem) => {
    //console.log(elem);

    //make a copy
    const updatedForm = {...this.state.enrollForm};

    //store the input value
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    //pass entire fieldType to a function that checks validity of value
    let checkValid = validate(updatedForm[elem.myFieldType]);

    //update
    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];
    console.log(updatedForm[elem.myFieldType]);

    //save
    this.setState({enrollForm: updatedForm});
  }

  render() {
    return (
      <div className="enroll_wrapper">
        <div className="enroll_title">
          Enter your email
        </div>

        <form onSubmit={this.submitFormHandler}>
          <div className="enroll_input">
            <FormField
              fieldType="email"
              fieldData={this.state.enrollForm.email}
              changed={this.updateFormHandler}
            />
            <div className="formSubmit_label">
              {this.state.formSubmitMsg}
            </div>
          </div>

          <button>Enroll</button>
        </form>

        <div className="enroll_description">
          Submitted emails will be entered into a raffle and a winner be randomly drawn.
          The lucky winner will then be contacted for additional steps and details.
        </div>
      </div>
    );
  }
}

export default Enroll;