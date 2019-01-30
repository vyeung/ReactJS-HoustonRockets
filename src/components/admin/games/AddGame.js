import React, { Component } from 'react';
import "./AdminGames.css";

import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../utils/formField";
import validate from "../../utils/validate";

import { firebaseTeams, firebaseGames } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";

class AddGame extends Component {

  state = {
    formError: "false",
    formSubmitMsg: "",
    teams: [],
    addGameForm: {
      date: {
        htmlTag: "input",
        value: "",
        config: {
          name: "date_input",
          type: "date"
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMsg: ""
      },
      rockets: {
        htmlTag: "select",
        value: "Rockets",
        config: {
          name: "rockets",
          type: "select",
          options: [{key:"Rockets", value:"Rockets"}]
        },
        validation: {
          required: true 
        },
        valid: true,
        validationMsg: ""
      },
      rocketsScore: {
        htmlTag: "input",
        value: "",
        config: {
          name: "rocketsScore_input",
          placeholder: "Score..."
        },
        validation: {
          required: true,
          numOrDash: true
        },
        valid: false,
        validationMsg: ""
      },
      homeOrAway: {
        htmlTag: "select",
        value: "",
        config: {
          name: "homeOrAway_input",
          type: "select",
          options: [
            {key:"vs", value:"vs (home game)"}, 
            {key:"@", value:"@ (away game)"}
          ]
        },
        validation: {
          required: true 
        },
        valid: false,
        validationMsg: ""
      },
      opponent: {
        htmlTag: "select",
        value: "",
        config: {
          name: "select_opponent",
          type: "select",
          options: []
        },
        validation: {
          required: true 
        },
        valid: false,
        validationMsg: ""
      },
      opponentScore: {
        htmlTag: "input",
        value: "",
        config: {
          name: "opponentScore_input",
          placeholder: "Score..."
        },
        validation: {
          required: true,
          numOrDash: true
        },
        valid: false,
        validationMsg: ""
      },
      result: {
        htmlTag: "select",
        value: "",
        config: {
          name: "select_result",
          type: "select",
          options: [
            {key:"W", value:"Win"},
            {key:"L", value:"Loss"},
            {key:"T", value:"Tie"},
            {key:"C", value:"Cancelled"},
            {key:"n/a", value:"TBD"}
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMsg: ""
      }
    }
  }

  componentDidMount() {
    this.getTeamsFromDB();
    this.fillDefaultFields();
  }

  getTeamsFromDB = () => {
    firebaseTeams.once("value")
      .then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        const formattedTeams = [];

        //push objects with key, value pairs
        for(var i=0; i<teams.length; i++) {
          if(teams[i].shortName === "Rockets") 
            continue;  //don't add Rockets as an opponent

          formattedTeams.push({
            key: teams[i].shortName,
            value: teams[i].shortName
          });
        }

        //sort alphabetically by shortName
        formattedTeams.sort((a, b) => {
          return a.value.localeCompare(b.value);
        })

        const updateTeamSelects = {...this.state.addGameForm};
        updateTeamSelects.opponent.config.options = formattedTeams;

        this.setState({addGameForm: updateTeamSelects});
      })
  }

  fillDefaultFields = () => {
    const updatedForm = {...this.state.addGameForm};

    updatedForm.result.value = "n/a";
    updatedForm.result.valid = true;

    this.setState({addGameForm: updatedForm});
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit;
    if(this.state.addGameForm.homeOrAway.value === "vs") {
      dataToSubmit = {
        away: this.state.addGameForm.opponent.value,
        awayScore: this.state.addGameForm.opponentScore.value,
        awayThmb: this.state.addGameForm.opponent.value.toLowerCase(),
        date: this.state.addGameForm.date.value,
        home: this.state.addGameForm.rockets.value,
        homeScore: this.state.addGameForm.rocketsScore.value,
        homeThmb: this.state.addGameForm.rockets.value.toLowerCase(),
        result: this.state.addGameForm.result.value
      };
    }
    else if(this.state.addGameForm.homeOrAway.value === "@") {
      dataToSubmit = {
        away: this.state.addGameForm.rockets.value,
        awayScore: this.state.addGameForm.rocketsScore.value,
        awayThmb: this.state.addGameForm.rockets.value.toLowerCase(),
        date: this.state.addGameForm.date.value,
        home: this.state.addGameForm.opponent.value,
        homeScore: this.state.addGameForm.opponentScore.value,
        homeThmb: this.state.addGameForm.opponent.value.toLowerCase(),
        result: this.state.addGameForm.result.value
      };
    }
    let overallFormIsValid = true;

    //check if any field is submitted with errors
    for (var key in this.state.addGameForm) {
      if(this.state.addGameForm[key].valid === false) {
        overallFormIsValid = false;
        break;
      }
    }

    if(overallFormIsValid === true) {
      firebaseGames.once("value")  //check for a response first
        .then(() => {
          firebaseGames.push(dataToSubmit);
          this.setState({formSubmitMsg: "Game Added!"});
          setTimeout(() => {
            this.setState({formSubmitMsg: ""});
            this.props.history.push("/admin_games");
          }, 1000);
        })
    }
    else {
      this.setState({formSubmitMsg: "Please submit valid fields"});
      setTimeout(() => {
        this.setState({formSubmitMsg: ""});
      }, 2000);
    }
  }

  updateFormHandler = (elem) => {
    const updatedForm = {...this.state.addGameForm};
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);
    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({addGameForm: updatedForm});
  }

  render() {
    // console.log(this.state.addGameForm);
    return (
      <AdminLayout>
        <div className="addEditGame_wrapper">
          <h2>Add Game</h2>

          <form onSubmit={this.submitFormHandler}>
            <div className="addEditGame_grouping">
              <div className="addEditGame_label">Game Date</div>
              <FormField
                fieldType="date"
                fieldData={this.state.addGameForm.date}
                changed={this.updateFormHandler}
              />
            </div>
            
            <div className="addEditGame_label">Matchup</div>
            <div className="addEditGame_grouping">
              <div className="addEditGame_grouping4">
                <div className="grouping4_rockets">
                  <FormField
                    fieldType="rockets"
                    fieldData={this.state.addGameForm.rockets}
                    changed={this.updateFormHandler}
                  />
                </div>
                <div className="grouping4_rocketsScore">
                  <FormField
                    fieldType="rocketsScore"
                    fieldData={this.state.addGameForm.rocketsScore}
                    changed={this.updateFormHandler}
                  />
                </div>
              </div>
              <div className="homeOrAway">
                <FormField
                  fieldType="homeOrAway"
                  fieldData={this.state.addGameForm.homeOrAway}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="addEditGame_grouping4">
                <div className="grouping4_opponent">
                  <FormField
                    fieldType="opponent"
                    fieldData={this.state.addGameForm.opponent}
                    changed={this.updateFormHandler}
                    optionMsg="Select Opponent"
                  />
                </div>
                <div className="grouping4_opponentScore">
                  <FormField
                    fieldType="opponentScore"
                    fieldData={this.state.addGameForm.opponentScore}
                    changed={this.updateFormHandler}
                  />
                </div>
              </div>
            </div>
            
            <div className="addEditGame_grouping">
              <div className="addEditGame_label">Game Result</div>
              <FormField
                fieldType="result"
                fieldData={this.state.addGameForm.result}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditGame_grouping2">
              <button>Add Game</button> 
              <div className="addEditGame_formSubmit">{this.state.formSubmitMsg}</div>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddGame;