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

Formsy.addValidationRule('hasGender', (values, value) => {
  if (value) {
    return true;
  }
});

let paddingValue = 40;
const isMobile = window.innerWidth <= 767;

if (isMobile) {
  paddingValue = 25;
}

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
      padding: paddingValue,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
    inputStyle: {
      fontSize: '18px',
      width: '100%'
    },
    helperText: {
      color: '#373D3F',
      fontFamily: 'acherus_grotesque_regular'
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

  },

  render() {
    let {paperStyle, switchStyle, submitStyle, inputStyle, helperText } = this.styles;
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
            <h2>Step 2: Personal Information</h2>
            <div>
              <FormsyText
                name="full name"
                value={this.props.fieldValues.name}
                validations={{matchRegexp: /^([A-Za-z\-\. ]+)$/}}
                validationError={wordsError}
                hintStyle={helperText}
                hintText="John Doe"
                floatingLabelText="Name *"
                ref={(name) => {this._fullName = name}}
                style={inputStyle}
                updateImmediately
                required />
            </div>

            <div>
              <FormsyText
                name="date of birth"
                value={this.props.fieldValues.dob}
                validations={{matchRegexp: /^(0[1-9]|[1-9]|1[012])\/(0[1-9]|[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/}}
                validationError={dobError}
                hintStyle={helperText}
                hintText="MM/DD/YYYY"
                floatingLabelText="Date of Birth *"
                ref={(dob) => {this._dob = dob}}
                style={inputStyle}
                required />
            </div>

            <div className="form-element">
              <FormsyRadioGroup name="gender"
                                defaultSelected={this.props.fieldValues.gender}
                                ref={(gender) => {this._gender = gender}}
                                validations="hasGender">
                <FormsyRadio
                  value="Male"
                  label="Male"
                  style={switchStyle}
                  required
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

