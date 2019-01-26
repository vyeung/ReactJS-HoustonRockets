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
      home: {
        htmlTag: "select",
        value: "",
        config: {
          name: "select_home_team",
          type: "select",
          options: []
        },
        validation: {
          required: true 
        },
        valid: false,
        validationMsg: ""
      },
      homeScore: {
        htmlTag: "input",
        value: "",
        config: {
          name: "homeScore_input",
          placeholder: "Number..."
        },
        validation: {
          required: true,
          numOrDash: true
        },
        valid: false,
        validationMsg: ""
      },
      away: {
        htmlTag: "select",
        value: "",
        config: {
          name: "select_away_team",
          type: "select",
          options: []
        },
        validation: {
          required: true 
        },
        valid: false,
        validationMsg: ""
      },
      awayScore: {
        htmlTag: "input",
        value: "",
        config: {
          name: "awayScore_input",
          placeholder: "Number..."
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
        //console.log(game);
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
        updateTeamSelects.home.config.options = formattedTeams;
        updateTeamSelects.away.config.options = formattedTeams;

        this.setState({editGameForm: updateTeamSelects});
      })
  }

  fillFieldsWithGameInfo = (game, gameId) => {
    const updatedForm = {...this.state.editGameForm};

    for(var key in updatedForm) {
      //when the game field is also in our form
      if(updatedForm[key] && game[key]) {
        updatedForm[key].value = game[key];
        updatedForm[key].valid = true;
      }
    }

    this.setState({
      editGameForm: updatedForm,
      gameId: gameId
    });
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {
      away: this.state.editGameForm.away.value,
      awayScore: this.state.editGameForm.awayScore.value,
      awayThmb: this.state.editGameForm.away.value.toLowerCase(),
      date: this.state.editGameForm.date.value,
      home: this.state.editGameForm.home.value,
      homeScore: this.state.editGameForm.homeScore.value,
      homeThmb: this.state.editGameForm.home.value.toLowerCase(),
      result: this.state.editGameForm.result.value
    };
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
          }, 2000);
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
    // console.log(this.state.editGameForm);
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
            
            <div className="addEditGame_grouping">
              <div className="addEditGame_label">Home Team</div>
              <FormField
                fieldType="home"
                fieldData={this.state.editGameForm.home}
                changed={this.updateFormHandler}
              />
              <div className="addEditGame_label">Home Score</div>
              <div className="addEditGame_score">
                <FormField
                  fieldType="homeScore"
                  fieldData={this.state.editGameForm.homeScore}
                  changed={this.updateFormHandler}
                />
              </div>

              <div className="addEditGame_label">Away Team</div>
              <FormField
                fieldType="away"
                fieldData={this.state.editGameForm.away}
                changed={this.updateFormHandler}
              />
              <div className="addEditGame_label">Away Score</div>
              <div className="addEditGame_score">
                <FormField
                  fieldType="awayScore"
                  fieldData={this.state.editGameForm.awayScore}
                  changed={this.updateFormHandler}
                />
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