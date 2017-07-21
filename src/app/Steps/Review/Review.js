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

let paddingValue = 40;
const isMobile = window.innerWidth <= 767;
const isTablet = window.innerWidth <= 1025;

if (isMobile) {
  paddingValue = 25;
}

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
      padding: paddingValue,
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
          <h2>Step 5: Review & Submit</h2>
          <h4>
            <i>Make sure everything looks right!</i>
          </h4>

          {
            isTablet ? (
              <ReviewImages title="Prescription Information"
                            data={prescriptionData}
                            step={1}
                            handleEdit={this.props.handleEdit}
                            handleNext={this.props.handleNext} />
            ) : (
              <ReviewTables title="Prescription Information"
                            data={prescriptionData}
                            step={1}
                            handleEdit={this.props.handleEdit}
                            handleNext={this.props.handleNext} />
            )
          }

          <ReviewTables title="Personal Information"
                        data={personalData}
                        step={2}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <ReviewTables title="Contact Information"
                        data={contactData}
                        step={3}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <ReviewImages title="Insurance Information"
                        data={insuranceData}
                        step={4}
                        handleEdit={this.props.handleEdit}
                        handleNext={this.props.handleNext} />

          <div className="spacer-medium"></div>

          <StepButtons data={data}
                       handleNext={this.props.handleNext}
                       handlePrev={this.props.handlePrev}
                       saveValues={this.props.saveValues}
                       stepIndex={this.props.stepIndex}
                       validated={true} />
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Review;

