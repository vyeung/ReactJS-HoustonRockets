import React, { Component } from 'react';
import "./Login.css";

import FormField from "../utils/formField";
import validate from "../utils/validate";
import { firebase } from "../../firebase";

class Login extends Component {
  
  state = {
    formError: false,
    formSubmitMsg: "",
    loginForm: {
      email: {
        htmlTag: "input",
        value: "",
        config: {
          name: "email_input",
          placeholder: "Enter your email..."
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMsg: ""
      },
      password: {
        htmlTag: "input",
        value: "",
        config: {
          name: "password_input",
          placeholder: "Enter your password..."
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMsg: ""
      },
    }
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {};
    let overallFormIsValid = true;

    for (var key in this.state.loginForm) {
      dataToSubmit[key] = this.state.loginForm[key].value;
      
      //don't need to continue loop if a field is submitted with errors
      if(this.state.loginForm[key].valid === false) {
        overallFormIsValid = false;
        break;
      }
    }
    //console.log(dataToSubmit);

    if(overallFormIsValid === true) {
      firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.setState({formSubmitMsg: "Welcome!"});
          
          //redirect to /dashboard after 1.5s
          setTimeout(() => {
            this.props.history.push("/dashboard");
          }, 1500);
        })
        .catch(() => {
          this.setState({formSubmitMsg: "Invalid credentials"});
          
          //clear submit message after 2s
          setTimeout(() => {
            this.setState({formSubmitMsg: ""});
          }, 2000);
        })
    }
    else {
      this.setState({formSubmitMsg: "Please submit valid fields"});
      setTimeout(() => {
        this.setState({formSubmitMsg: ""});
      }, 3000);
    }
  }

  updateFormHandler = (elem) => {
    const updatedForm = {...this.state.loginForm};

    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);

    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({loginForm: updatedForm});
  }
  
  render() {
    return (
      <div className="login_main">
        <div className="login_center">
          <div className="login_contents">
            <h2>Admin Login</h2>
            
            <form onSubmit={this.submitFormHandler}>
              <div className="formSubmit_label">
                {this.state.formSubmitMsg}
              </div>
              <FormField
                fieldType="email"
                fieldData={this.state.loginForm.email}
                changed={this.updateFormHandler}
              />
              <FormField
                fieldType="password"
                fieldData={this.state.loginForm.password}
                changed={this.updateFormHandler}
              />
              <button>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;