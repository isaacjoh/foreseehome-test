import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import StepButtons from '../../Components/StepButtons';

const states = ['AA','AE','AL','AK','AP','AZ','AS','AR','CA','CO','CT','DC','DE','FL','FM','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MH','MI','MN','MP','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','PW','RI','SC','SD','TN','TX','UT','VT','VA','VI','WA','WV','WI','WY'];

Formsy.addValidationRule('isValidState', (values, value) => {
  if (value) {
    value = value.toUpperCase();
  }

  if (states.indexOf(value) !== -1) {
    return true;
  } else {
    return false;
  }
});

const Contact = React.createClass({

  getInitialState() {
    return {
      canSubmit: false,
      shipState: ''
    };
  },

  errorMessages: {
    wordError: "Please use only letters",
    zipError: "Please provide a valid ZIP code",
    stateError: "Please provide a valid state",
    emailError: "Please provide a valid email",
    phoneError: "Please check the phone number format"
  },

  styles: {
    paperStyle: {
      width: 'auto',
      margin: 'auto',
      padding: 40,
    },
    inputStyle: {
      width: '100%'
    },
    shippingSectionStyle: {
      marginBottom: 0
    },
    shippingSubsectionStyle: {
      marginBottom: 15,
      marginTop: 15
    },
    contactSectionStyle: {
      marginBottom: 0,
      marginTop: 42
    },
    helperText: {
      color: '#373D3F',
      fontFamily: 'acherus_grotesque_regular'
    }
  },

  handleStateChange(event, index, value){
    this.setState({shipState: value});
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
    let { paperStyle, inputStyle, contactSectionStyle, shippingSectionStyle, shippingSubsectionStyle, helperText } = this.styles;
    let { wordError, zipError, stateError, emailError, phoneError } = this.errorMessages;

    let data = {};

    if (this._address) {
      data = {
        address: this._address.state.value,
        city: this._city.state.value,
        state: this._state.state.value,
        zip: this._zip.state.value,
        phone: this._phone.state.value,
        email: this._email.state.value
      };
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form onValid={this.enableButton}
                       onInvalid={this.disableButton}>
            <h2>Step 2: Contact Information</h2>
            <h3 style={shippingSectionStyle}>Your Shipping Address</h3>
            <h5 style={shippingSubsectionStyle}>
              <i>Where can we ship your ForeseeHome device?</i>
            </h5>

            <div className="fs-contact-info">
              <div>
                <FormsyText name="address"
                            value={this.props.fieldValues.address}
                            floatingLabelText="Street Address *"
                            hintStyle={helperText}
                            hintText="123 Main St, Apt D8"
                            ref={(address) => {this._address = address}}
                            style={inputStyle}
                            required />
              </div>
              <div>
                <FormsyText name="city"
                            value={this.props.fieldValues.city}
                            floatingLabelText="City *"
                            validations={{matchRegexp: /^([A-Za-z\- ]+)$/}}
                            validationError={wordError}
                            hintStyle={helperText}
                            hintText="Richmond"
                            ref={(city) => {this._city = city}}
                            style={inputStyle}
                            updateImmediately
                            required />
              </div>
              <div>
                <FormsyText name="state"
                            value={this.props.fieldValues.state}
                            floatingLabelText="State *"
                            validations="isValidState"
                            validationError={stateError}
                            hintStyle={helperText}
                            hintText="VA"
                            ref={(state) => {this._state = state}}
                            style={inputStyle}
                            updateImmediately
                            required />
              </div>
              <div>
                <FormsyText name="zip"
                            value={this.props.fieldValues.zip}
                            floatingLabelText="ZIP Code *"
                            validations={{matchRegexp: /^\d{5}(?:[-\s]\d{4})?$/}}
                            validationError={zipError}
                            hintStyle={helperText}
                            hintText="12345"
                            ref={(zip) => {this._zip = zip}}
                            style={inputStyle}
                            updateImmediately
                            required />
              </div>

              <h3 style={contactSectionStyle}>Your Contact Information</h3>
              <h5 className="phone-subtext">
                <i>We will only contact you if we have a question regarding your shipping or insurance information.</i>
              </h5>
              <div>
                <FormsyText name="phone"
                            value={this.props.fieldValues.phone}
                            floatingLabelText="Phone Number *"
                            validations={{matchRegexp: /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/}}
                            validationError={phoneError}
                            hintStyle={helperText}
                            hintText="(555) 555-5555"
                            ref={(phone) => {this._phone = phone}}
                            style={inputStyle}
                            updateImmediately
                            required />
              </div>
              <div>
                <FormsyText name="email"
                            value={this.props.fieldValues.email}
                            floatingLabelText="Email"
                            validations="isEmail"
                            validationError={emailError}
                            hintStyle={helperText}
                            hintText="john@gmail.com"
                            ref={(email) => {this._email = email}}
                            style={inputStyle}
                            updateImmediately />
              </div>
            </div>

            <div className="spacer-medium"></div>
            <StepButtons data={data}
                         handleEdit={this.props.handleEdit}
                         handleNext={this.props.handleNext}
                         handlePrev={this.props.handlePrev}
                         saveValues={this.props.saveValues}
                         stepIndex={this.props.stepIndex}
                         reviewing={this.props.reviewing}
                         validated={this.state.canSubmit} />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Contact;