import React, { Component } from 'react';
import "./AddGame.css";

import AdminLayout from "../../../hoc/adminLayout";
import FormField from "../../utils/formField";
import validate from "../../utils/validate";

import { firebaseTeams, firebaseGames } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";

class AddGame extends Component {

  state = {
    gameId: "",
    formType: "",
    formError: "false",
    formSubmitMsg: "",
    teams: [],
    addGameForm: {
      date: {
        htmlTag: "input",
        value: "",
        config: {
          name: "date_input",
          placeholder: "MM-DD-YYYY"
        },
        validation: {
          required: true,
          date: true
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
          number: true
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
          number: true
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
        updateTeamSelects.home.config.options = formattedTeams;
        updateTeamSelects.away.config.options = formattedTeams;

        this.setState({addGameForm: updateTeamSelects});
      })
  }

  fillDefaultFields = () => {
    const updatedForm = {...this.state.addGameForm};

    updatedForm.awayScore.value = "-";
    updatedForm.awayScore.valid = true;
    updatedForm.homeScore.value = "-";
    updatedForm.homeScore.valid = true;
    updatedForm.result.value = "n/a";
    updatedForm.result.valid = true;

    this.setState({addGameForm: updatedForm});
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    
    let dataToSubmit = {
      away: this.state.addGameForm.away.value,
      awayScore: this.state.addGameForm.awayScore.value,
      awayThmb: this.state.addGameForm.away.value.toLowerCase(),
      date: this.state.addGameForm.date.value,
      home: this.state.addGameForm.home.value,
      homeScore: this.state.addGameForm.homeScore.value,
      homeThmb: this.state.addGameForm.home.value.toLowerCase(),
      result: this.state.addGameForm.result.value
    };
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
    const updatedForm = {...this.state.addGameForm};
    updatedForm[elem.myFieldType].value = elem.event.target.value;

    let checkValid = validate(updatedForm[elem.myFieldType]);

    updatedForm[elem.myFieldType].valid = checkValid[0];
    updatedForm[elem.myFieldType].validationMsg = checkValid[1];

    this.setState({addGameForm: updatedForm});
  }

  render() {
    console.log(this.state.addGameForm);
    return (
      <AdminLayout>
        <div className="addGame_wrapper">
          <h2>Add Game</h2>

          <form onSubmit={this.submitFormHandler}>
            <div className="addGame_grouping">
              <div className="addGame_label">Game Date</div>
              <FormField
                fieldType="date"
                fieldData={this.state.addGameForm.date}
                changed={this.updateFormHandler}
              />
            </div>
            
            <div className="addGame_grouping">
              <div className="addGame_label">Home Team</div>
              <FormField
                fieldType="home"
                fieldData={this.state.addGameForm.home}
                changed={this.updateFormHandler}
              />
              <div className="addGame_label">Home Score</div>
              <div className="addGame_score">
                <FormField
                  fieldType="homeScore"
                  fieldData={this.state.addGameForm.homeScore}
                  changed={this.updateFormHandler}
                />
              </div>

              <div className="addGame_label">Away Team</div>
              <FormField
                fieldType="away"
                fieldData={this.state.addGameForm.away}
                changed={this.updateFormHandler}
              />
              <div className="addGame_label">Away Score</div>
              <div className="addGame_score">
                <FormField
                  fieldType="awayScore"
                  fieldData={this.state.addGameForm.awayScore}
                  changed={this.updateFormHandler}
                />
              </div>
            </div>

            <div className="addGame_grouping">
              <div className="addGame_label">Game Result</div>
              <FormField
                fieldType="result"
                fieldData={this.state.addGameForm.result}
                changed={this.updateFormHandler}
              />
            </div>

            <div className="addGame_grouping2">
              <button>Add Game</button> 
              <div className="addGame_formSubmit">{this.state.formSubmitMsg}</div>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }
}

export default AddGame;