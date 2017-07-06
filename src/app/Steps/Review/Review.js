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
import ReviewTables from '../../Components/ReviewTables';
import ReviewImages from '../../Components/ReviewImages';

const Review = React.createClass({

  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
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

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  },

  notifyFormError(data) {
    console.error('Form error:', data);
  },

  componentDidMount() {
    window.scrollTo(0, 0);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle } = this.styles;
    let { wordsError, numericError, urlError } = this.errorMessages;

    let data = this.props.fieldValues;

    let personalData = {
      'Full Name': data.name,
      'Date of Birth': data.dob,
      'Gender': data.gender
    };

    let contactData = {
      'Address': data.address,
      'City': data.city,
      'State': data.state,
      'ZIP Code': data.zip,
      'Phone Number': data.phone,
      'Email Address': data.email
      };

    let insuranceData = {
      'Primary Insurance': data.primaryInsSrc,
      'Secondary Insurance': data.secondaryInsSrc
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <h2>Step 4: Review & Submit</h2>
          <h4>
            <i>Make sure everything looks right!</i>
          </h4>

          <ReviewTables title="Personal Information"
                        data={personalData}
                        step={1}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <ReviewTables title="Contact Information"
                        data={contactData}
                        step={2}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <ReviewImages title="Insurance Information"
                        data={insuranceData}
                        step={3}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <div className="spacer-small"></div>

          <StepButtons data={data}
                       handleNext={this.props.handleNext}
                       handlePrev={this.props.handlePrev}
                       saveValues={this.props.saveValues}
                       stepIndex={this.props.stepIndex} />
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Review;

