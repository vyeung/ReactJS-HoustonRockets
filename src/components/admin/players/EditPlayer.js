import React, { Component } from 'react';
import "./AdminPlayers.css";

import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../utils/formField";
import validate from "../../utils/validate";

import { firebase, firebaseDB } from "../../../firebase";

class EditPlayer extends Component {

  state = {
    playerId: "",
    formError: "false",
    formSubmitMsg: "",
    selectedFile: null,
    fileURL: "",
    editPlayerForm: {
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

  componentDidMount() {
    //match object is provided by react-router
    const playerId = this.props.match.params.id;

    //find the target player in the database
    firebaseDB.ref(`players/${playerId}`).once("value")
      .then((snapshot) => {
        const playerData = snapshot.val();

        //get imgURL of player image
        firebase.storage().ref("playerImgs").child(playerData.image).getDownloadURL()
          .then((url) => {
            const imgURL = url;
            this.fillFieldsWithPlayerInfo(playerData, playerId, imgURL);
          })
      })
  }

  fillFieldsWithPlayerInfo = (playerData, playerId, imgURL) => {
    const updatedForm = {...this.state.editPlayerForm};

    for(var key in updatedForm) {
      updatedForm[key].value = playerData[key];
      updatedForm[key].valid = true;
    }

    this.setState({
      editPlayerForm: updatedForm,
      playerId: playerId,
      fileURL: imgURL
    });
  }

  updateFormHandler = (elem) => {
    const updatedForm = {...this.state.editPlayerForm};
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);
    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({editPlayerForm: updatedForm});
  }

  storeFilename = (filename) => {
    const updatedForm = {...this.state.editPlayerForm};
    updatedForm.image.value = filename;

    let checkValid = validate(updatedForm.image);
    updatedForm.image.valid = checkValid[0];
    updatedForm.image.validationMsg = checkValid[1];

    this.setState({editPlayerForm: updatedForm});
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {};
    let overallFormIsValid = true;

    for(var key in this.state.editPlayerForm) {
      dataToSubmit[key] = this.state.editPlayerForm[key].value;
      
      //don't need to continue loop if a field is submitted with errors
      if(this.state.editPlayerForm[key].valid === false) {
        overallFormIsValid = false;
        break;
      }
    }

    if(overallFormIsValid === true) {
      firebaseDB.ref(`players/${this.state.playerId}`).update(dataToSubmit)
        .then(() => {
          this.setState({formSubmitMsg: "Changes Saved!"});
          setTimeout(() => {
            this.setState({formSubmitMsg: ""});
            this.props.history.push("/admin_players");
          }, 2000);
        })
      //upload img to firebase storage
      firebase.storage().ref("playerImgs/" + this.state.editPlayerForm.image.value).put(this.state.selectedFile);
    }
    else {
      this.setState({formSubmitMsg: "Please submit valid fields"});
      setTimeout(() => {
        this.setState({formSubmitMsg: ""});
      }, 2000);
    }
  }

  resetImgHandler = () => {
    const updatedForm = {...this.state.editPlayerForm};
    updatedForm.image.value = "";
    updatedForm.image.valid = false;
    updatedForm.image.validationMsg = "";

    this.setState({
      selectedFile: null,
      fileURL: "",
      editPlayerForm: updatedForm
    });
  }

  fileSelectedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
    this.storeFilename(event.target.files[0].name);
  }

  render() {
    console.log(this.state);

    let imgMode = null;
    //corresponding img fetched from firebase storage
    if(this.state.fileURL) {
      imgMode = (
        <div className="fileUpload_container">
          <img src={this.state.fileURL} alt="img" />
          <div className="fileUpload_remove" onClick={this.resetImgHandler}>
            Change Photo
          </div>
        </div>
      );
    }
    //user selects a new photo
    else if(!this.state.fileURL && this.state.selectedFile) {
      imgMode = (
        <div className="fileUpload_container">
          <img src={URL.createObjectURL(this.state.selectedFile)} alt="img" />
          <div className="fileUpload_remove" onClick={this.resetImgHandler}>
            Change Photo
          </div>
        </div>
      );
    }
    //show input file select if we have nothing
    else if(!this.state.fileURL && !this.state.selectedFile) {
      imgMode = (
        <input type="file" accept="image/*" onChange={this.fileSelectedHandler} />
      );
    }

    return (
      <AdminLayout>
        <div className="addEditPlayer_wrapper">
          <h2>Edit Player</h2>

          <form onSubmit={this.submitFormHandler}>
            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Player Image</div>
              {imgMode}
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Jersey Number</div>
              <FormField
                fieldType="jerseyNum"
                fieldData={this.state.editPlayerForm.jerseyNum}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_label">Name</div>
            <div className="addEditPlayer_grouping2">
              <div className="grouping2_name">
                <FormField
                  fieldType="firstname"
                  fieldData={this.state.editPlayerForm.firstname}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="grouping2_name">
                <FormField
                  fieldType="lastname"
                  fieldData={this.state.editPlayerForm.lastname}
                  changed={this.updateFormHandler}
                />
              </div>
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Position</div>
              <FormField
                fieldType="position"
                fieldData={this.state.editPlayerForm.position}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_label">Height</div>
            <div className="addEditPlayer_grouping2">
              <div className="grouping2_height">
                <FormField
                  fieldType="heightFt"
                  fieldData={this.state.editPlayerForm.heightFt}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="grouping2_height">
                <FormField
                  fieldType="heightIn"
                  fieldData={this.state.editPlayerForm.heightIn}
                  changed={this.updateFormHandler}
                />
              </div>
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Weight</div>
              <FormField
                fieldType="weight"
                fieldData={this.state.editPlayerForm.weight}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_grouping">
              <div className="addEditPlayer_label">Experience</div>
              <FormField
                fieldType="exp"
                fieldData={this.state.editPlayerForm.exp}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditPlayer_grouping2">
              <button>Confirm Changes</button> 
              <div className="addEditPlayer_formSubmit">{this.state.formSubmitMsg}</div>
            </div>
          </form>
        </div>
      </AdminLayout>
    )
  }
}

export default EditPlayer;