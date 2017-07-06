// imp

import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';

import StepButtons from '../../Components/StepButtons';

const Personal = React.createClass({

  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: "Please use only letters",
    numericError: "Please provide a number",
    dobError: "Please check the date format",
  },

  styles: {
    paperStyle: {
      width: 'auto',
      margin: 'auto',
      padding: 40,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
    inputStyle: {
      width: '100%'
    }
  },

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  },

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  componentDidMount() {
    window.scrollTo(0, 0);
  },

  submitForm(data, reset, update) {
    console.log('just submit');
  },

  render() {
    let {paperStyle, switchStyle, submitStyle, inputStyle } = this.styles;
    let { wordsError, numericError, dobError } = this.errorMessages;

    let data = {};

    if (this._fullName) {
      data = {
        name: this._fullName.state.value,
        dob: this._dob.state.value,
        gender: this._gender.state._value
      };
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form onValid={this.enableButton}
                       onInvalid={this.disableButton}>
            <h2>Step 1: Personal Information</h2>
            <div>
              <FormsyText
                name="full name"
                value={this.props.fieldValues.name}
                validations={{matchRegexp: /^([A-Za-z\-\. ]+)$/}}
                validationError={wordsError}
                required
                hintStyle={{fontFamily: 'acherus_grotesque_regular'}}
                hintText="John Doe"
                floatingLabelText="Name *"
                ref={(name) => {this._fullName = name}}
                style={inputStyle}
                updateImmediately
              />
            </div>

            <div>
              <FormsyText
                name="date of birth"
                value={this.props.fieldValues.dob}
                validations={{matchRegexp: /^([1-9]|1[012])\/([1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/}}
                validationError={dobError}
                hintStyle={{fontFamily: 'acherus_grotesque_regular'}}
                hintText="MM/DD/YYYY"
                floatingLabelText="Date of Birth"
                ref={(dob) => {this._dob = dob}}
                style={inputStyle}
              />
            </div>

            <div className="form-element">
              <FormsyRadioGroup name="gender"
                                defaultSelected={this.props.fieldValues.gender}
                                ref={(gender) => {this._gender = gender}}>
                <FormsyRadio
                  value="Male"
                  label="Male"
                  style={switchStyle}
                />
                <FormsyRadio
                  value="Female"
                  label="Female"
                  style={switchStyle}
                />
              </FormsyRadioGroup>
            </div>

            <div className="spacer-medium"></div>
            <StepButtons data={data}
                         handleEdit={this.props.handleEdit}
                         handleNext={this.props.handleNext}
                         handlePrev={this.props.handlePrev}
                         reviewing={this.props.reviewing}
                         saveValues={this.props.saveValues}
                         stepIndex={this.props.stepIndex}
                         validated={this.state.canSubmit} />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Personal;

