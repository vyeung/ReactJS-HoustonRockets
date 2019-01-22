import React, { Component } from 'react';
import "./AdminPlayers.css";

import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../utils/formField";
import validate from "../../utils/validate";

import { firebase, firebasePlayers } from "../../../firebase";

class AddPlayer extends Component {
  
  state = {
    formError: "false",
    formSubmitMsg: "",
    selectedFile: null,
    addPlayerForm: {
      image: {
        value: "",  //aka the img name
        validation: {
          required: true
        },
        valid: false,
        validationMsg: ""
      },
      jerseyNum: {
        htmlTag: "input",
        value: "",
        config: {
          name: "jerseyNum",
          placeholder: "Number..."
        },
        validation: {
          required: true,
          number: true
        },
        valid: false,
        validationMsg: ""
      },
      firstname: {
        htmlTag: "input",
        value: "",
        config: {
          name: "firstname",
          placeholder: "First..."
        },
        validation: {
          required: true,
          letters: true
        },
        valid: false,
        validationMsg: ""
      },
      lastname: {
        htmlTag: "input",
        value: "",
        config: {
          name: "lastname",
          placeholder: "Last..."
        },
        validation: {
          required: true,
          letters: true
        },
        valid: false,
        validationMsg: ""
      },
      position: {
        htmlTag: "select",
        value: "",
        config: {
          name: "select_position",
          type: "select",
          options: [
            {key:"C", value:"Center"},
            {key:"PG", value:"Point Guard"},
            {key:"SG", value:"Shooting Guard"},
            {key:"PF", value:"Power Forward"},
            {key:"SF", value:"Small Forward"}
          ]
        },
        validation: {
          required: true 
        },
        valid: false,
        validationMsg: ""
      },
      heightFt: {
        htmlTag: "input",
        value: "",
        config: {
          name: "heightFt",
          placeholder: "Feet..."
        },
        validation: {
          required: true,
          number: true
        },
        valid: false,
        validationMsg: ""
      },
      heightIn: {
        htmlTag: "input",
        value: "",
        config: {
          name: "heightIn",
          placeholder: "Inches..."
        },
        validation: {
          required: true,
          number: true
        },
        valid: false,
        validationMsg: ""
      },
      weight: {
        htmlTag: "input",
        value: "",
        config: {
          name: "weight",
          placeholder: "lbs..."
        },
        validation: {
          required: true,
          number: true
        },
        valid: false,
        validationMsg: ""
      },
      exp: {
        htmlTag: "input",
        value: "",
        config: {
          name: "experience",
          placeholder: "Years Pro..."
        },
        validation: {
          required: true,
          number: true
        },
        valid: false,
        validationMsg: ""
      }
    }
  }

  updateFormHandler = (elem) => {
    const updatedForm = {...this.state.addPlayerForm};
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);
    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({addPlayerForm: updatedForm});
  }

  //very similar to updateFormHandler, but specific to image section of form since 
  //it's not created as a FormField
  storeFilename = (filename) => {
    const updatedForm = {...this.state.addPlayerForm};
    updatedForm.image.value = filename;

    let checkValid = validate(updatedForm.image);
    updatedForm.image.valid = checkValid[0];
    updatedForm.image.validationMsg = checkValid[1];

    this.setState({addPlayerForm: updatedForm});
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {};
    let overallFormIsValid = true;

    for(var key in this.state.addPlayerForm) {
      dataToSubmit[key] = this.state.addPlayerForm[key].value;
      
      //don't need to continue loop if a field is submitted with errors
      if(this.state.addPlayerForm[key].valid === false) {
        overallFormIsValid = false;
        break;
      }
    }

    if(overallFormIsValid === true) {
      firebasePlayers.push(dataToSubmit)
        .then(() => {
          this.setState({formSubmitMsg: "Player Added!"});
          setTimeout(() => {
            this.setState({formSubmitMsg: ""});
            this.props.history.push("/admin_players");
          }, 2000);
        })
      //upload img to firebase storage
      firebase.storage().ref("playerImgs/" + this.state.addPlayerForm.image.value).put(this.state.selectedFile);
    }
    else {
      this.setState({formSubmitMsg: "Please submit valid fields"});
      setTimeout(() => {
        this.setState({formSubmitMsg: ""});
      }, 2000);
    }
  }

  resetImgHandler = () => {
    const updatedForm = {...this.state.addPlayerForm};
    updatedForm.image.value = "";
    updatedForm.image.valid = false;
    updatedForm.image.validationMsg = "";

    this.setState({
      addPlayerForm: updatedForm, 
      selectedFile: null
    });
  }

  fileSelectedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
    this.storeFilename(event.target.files[0].name);
  }
  
  render() {
    console.log(this.state);

    let imgMode = null;
    if(this.state.selectedFile) {
      imgMode = (
        <div className="fileUpload_container">
          {/*show preview of img without uploading it yet*/}
          <img src={URL.createObjectURL(this.state.selectedFile)} alt="img" />
          <div className="fileUpload_remove" onClick={this.resetImgHandler}>
            Change Photo
          </div>
        </div>
      );
    }
    else if(!this.state.selectedFile) {
      imgMode = (
        <input type="file" accept="image/*" onChange={this.fileSelectedHandler} />
      );
    }

    return (
      <AdminLayout>
        <div className="addEditPlayer_wrapper">
          <h2>Add Player</h2>

          <form onSubmit={this.submitFormHandler}>
            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Player Image</div>
              {imgMode}
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Jersey Number</div>
              <FormField
                fieldType="jerseyNum"
                fieldData={this.state.addPlayerForm.jerseyNum}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_label">Name</div>
            <div className="addEditPlayer_grouping2">
              <div className="grouping2_name">
                <FormField
                  fieldType="firstname"
                  fieldData={this.state.addPlayerForm.firstname}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="grouping2_name">
                <FormField
                  fieldType="lastname"
                  fieldData={this.state.addPlayerForm.lastname}
                  changed={this.updateFormHandler}
                />
              </div>
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Position</div>
              <FormField
                fieldType="position"
                fieldData={this.state.addPlayerForm.position}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_label">Height</div>
            <div className="addEditPlayer_grouping2">
              <div className="grouping2_height">
                <FormField
                  fieldType="heightFt"
                  fieldData={this.state.addPlayerForm.heightFt}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="grouping2_height">
                <FormField
                  fieldType="heightIn"
                  fieldData={this.state.addPlayerForm.heightIn}
                  changed={this.updateFormHandler}
                />
              </div>
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Weight</div>
              <FormField
                fieldType="weight"
                fieldData={this.state.addPlayerForm.weight}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Experience</div>
              <FormField
                fieldType="exp"
                fieldData={this.state.addPlayerForm.exp}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_grouping2">
              <button>Add Player</button> 
              <div className="addEditPlayer_formSubmit">{this.state.formSubmitMsg}</div>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddPlayer;