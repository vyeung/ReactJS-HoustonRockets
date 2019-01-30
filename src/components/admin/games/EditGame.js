import React, { Component } from 'react';
import "./AdminGames.css";

import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../utils/formField";
import validate from "../../utils/validate";

import { firebaseDB, firebaseTeams} from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";

class EditGame extends Component {

  state = {
    gameId: "",
    formError: "false",
    formSubmitMsg: "",
    teams: [],
    editGameForm: {
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
          required: true,
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
    
    //match object is provided by react-router
    const gameId = this.props.match.params.id;
    
    //find the target game in the database
    firebaseDB.ref(`games/${gameId}`).once("value")
      .then((snapshot) => {
        const game = snapshot.val();
        this.fillFieldsWithGameInfo(game, gameId);
      })
  }

  getTeamsFromDB = () => {
    firebaseTeams.once("value")
      .then((snapshot) => {
        const teams = firebaseLooper(snapshot);
        const formattedTeams = [];

        //push objects with key, value pairs
        for(var i=0; i<teams.length; i++) {
          if(teams[i].shortName === "Rockets")
            continue;

          formattedTeams.push({
            key: teams[i].shortName,
            value: teams[i].shortName
          });
        }

        //sort alphabetically by shortName
        formattedTeams.sort((a, b) => {
          return a.value.localeCompare(b.value);
        })

        const updateTeamSelects = {...this.state.editGameForm};
        updateTeamSelects.opponent.config.options = formattedTeams;

        this.setState({editGameForm: updateTeamSelects});
      })
  }

  fillFieldsWithGameInfo = (game, gameId) => {
    const updatedForm = {...this.state.editGameForm};

    updatedForm.date.value = game.date;
    updatedForm.date.valid = true;
    updatedForm.result.value = game.result;
    updatedForm.result.valid = true;

    if(game.home === "Rockets") {
      updatedForm.rocketsScore.value = game.homeScore;
      updatedForm.rocketsScore.valid = true;
      updatedForm.homeOrAway.value = "vs";
      updatedForm.homeOrAway.valid = true;
      updatedForm.opponent.value = game.away;
      updatedForm.opponent.valid = true;
      updatedForm.opponentScore.value = game.awayScore;
      updatedForm.opponentScore.valid = true;
    }
    else {
      updatedForm.rocketsScore.value = game.awayScore;
      updatedForm.rocketsScore.valid = true;
      updatedForm.homeOrAway.value = "@";
      updatedForm.homeOrAway.valid = true;
      updatedForm.opponent.value = game.home;
      updatedForm.opponent.valid = true;
      updatedForm.opponentScore.value = game.homeScore;
      updatedForm.opponentScore.valid = true;
    }

    this.setState({
      editGameForm: updatedForm,
      gameId: gameId
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit;
    if(this.state.editGameForm.homeOrAway.value === "vs") {
      dataToSubmit = {
        away: this.state.editGameForm.opponent.value,
        awayScore: this.state.editGameForm.opponentScore.value,
        awayThmb: this.state.editGameForm.opponent.value.toLowerCase(),
        date: this.state.editGameForm.date.value,
        home: this.state.editGameForm.rockets.value,
        homeScore: this.state.editGameForm.rocketsScore.value,
        homeThmb: this.state.editGameForm.rockets.value.toLowerCase(),
        result: this.state.editGameForm.result.value
      };
    }
    else if(this.state.editGameForm.homeOrAway.value === "@") {
      dataToSubmit = {
        away: this.state.editGameForm.rockets.value,
        awayScore: this.state.editGameForm.rocketsScore.value,
        awayThmb: this.state.editGameForm.rockets.value.toLowerCase(),
        date: this.state.editGameForm.date.value,
        home: this.state.editGameForm.opponent.value,
        homeScore: this.state.editGameForm.opponentScore.value,
        homeThmb: this.state.editGameForm.opponent.value.toLowerCase(),
        result: this.state.editGameForm.result.value
      };
    }
    let overallFormIsValid = true;

    //check if any field is submitted with errors
    for (var key in this.state.editGameForm) {
      if(this.state.editGameForm[key].valid === false) {
        overallFormIsValid = false;
        break;
      }
    }

    if(overallFormIsValid === true) {
      firebaseDB.ref(`games/${this.state.gameId}`).update(dataToSubmit)
        .then(() => {
          this.setState({formSubmitMsg: "Changes Saved!"});
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
    const updatedForm = {...this.state.editGameForm};
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);
    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({editGameForm: updatedForm});
  }

  deleteGameHandler = () => {
    //user wants to continue with delete
    if(window.confirm("Are you sure? This action is permanent.") === true) {
      //remove game node
      firebaseDB.ref(`games/${this.state.gameId}`).remove()
        .then(() => {
          setTimeout(() => {
            this.props.history.push("/admin_games");
          }, 1000);
        })
    }
    //user cancelled, don't need to do anything
    else {
    }
  }


  render() {
    console.log(this.state.editGameForm);
    return (
      <AdminLayout>
        <div className="addEditGame_wrapper">
          <h2>Edit Game</h2>

          <form onSubmit={this.submitFormHandler}>
            <div className="addEditGame_grouping">
              <div className="addEditGame_label">Game Date</div>
              <FormField
                fieldType="date"
                fieldData={this.state.editGameForm.date}
                changed={this.updateFormHandler}
              />
            </div>
            
            <div className="addEditGame_label">Matchup</div>
            <div className="addEditGame_grouping">
              <div className="addEditGame_grouping4">
                <div className="grouping4_rockets">
                  <FormField
                    fieldType="rockets"
                    fieldData={this.state.editGameForm.rockets}
                    changed={this.updateFormHandler}
                  />
                </div>
                <div className="grouping4_rocketsScore">
                  <FormField
                    fieldType="rocketsScore"
                    fieldData={this.state.editGameForm.rocketsScore}
                    changed={this.updateFormHandler}
                  />
                </div>
              </div>
              <div className="homeOrAway">
                <FormField
                  fieldType="homeOrAway"
                  fieldData={this.state.editGameForm.homeOrAway}
                  changed={this.updateFormHandler}
                />
              </div>
              <div className="addEditGame_grouping4">
                <div className="grouping4_opponent">
                  <FormField
                    fieldType="opponent"
                    fieldData={this.state.editGameForm.opponent}
                    changed={this.updateFormHandler}
                    optionMsg="Select Opponent"
                  />
                </div>
                <div className="grouping4_opponentScore">
                  <FormField
                    fieldType="opponentScore"
                    fieldData={this.state.editGameForm.opponentScore}
                    changed={this.updateFormHandler}
                  />
                </div>
              </div>
            </div>

            <div className="addEditGame_grouping">
              <div className="addEditGame_label">Game Result</div>
              <FormField
                fieldType="result"
                fieldData={this.state.editGameForm.result}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addEditGame_grouping3">
              <button>Confirm Changes</button> 
              <div className="addEditGame_formSubmit">{this.state.formSubmitMsg}</div>
            </div>
          </form>

          <button className="deleteGame" onClick={this.deleteGameHandler}>
            Delete Game
          </button>
        </div>
      </AdminLayout>
    );
  }
}

export default EditGame;