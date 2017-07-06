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

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

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
    let { paperStyle, inputStyle, contactSectionStyle, shippingSectionStyle, shippingSubsectionStyle } = this.styles;
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
          <h2>Step 2: Contact Information</h2>
          <h3 style={shippingSectionStyle}>Your Shipping Address</h3>
          <h5 style={shippingSubsectionStyle}>
            <i>Where can we ship your ForeseeHome device?</i>
          </h5>

          <div className="fs-contact-info">
            <div>
              <FormsyText name="address"
                          value={this.props.fieldValues.address}
                          required
                          floatingLabelText="Street Address"
                          ref={(address) => {this._address = address}}
                          style={inputStyle} />
            </div>
            <div>
              <FormsyText name="city"
                          value={this.props.fieldValues.city}
                          floatingLabelText="City"
                          validations="isWords"
                          validationError={wordError}
                          required
                          ref={(city) => {this._city = city}}
                          style={inputStyle} />
            </div>
            <div>
              <FormsyText name="state"
                          value={this.props.fieldValues.state}
                          validations="isWords,maxLength:2"
                          validationError={stateError}
                          required
                          floatingLabelText="State"
                          hintStyle={{fontFamily: 'acherus_grotesque_regular'}}
                          hintText="NY"
                          ref={(state) => {this._state = state}}
                          style={inputStyle} />
            </div>
            <div>
              <FormsyText name="zip"
                          value={this.props.fieldValues.zip}
                          validations={{matchRegexp: /^\d{5}(?:[-\s]\d{4})?$/}}
                          validationError={zipError}
                          required
                          floatingLabelText="ZIP Code"
                          ref={(zip) => {this._zip = zip}}
                          style={inputStyle} />
            </div>

            <h3 style={contactSectionStyle}>Your Contact Information</h3>
            <h5 className="phone-subtext">
              <i>We will only contact you if we have a question regarding your shipping or insurance information.</i>
            </h5>
            <div>
              <FormsyText name="phone"
                          value={this.props.fieldValues.phone}
                          floatingLabelText="Phone Number"
                          validations={{matchRegexp: /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/}}
                          validationError={phoneError}
                          required
                          hintStyle={{fontFamily: 'acherus_grotesque_regular'}}
                          hintText="(555) 555-5555"
                          ref={(phone) => {this._phone = phone}}
                          style={inputStyle} />
            </div>
            <div>
              <FormsyText name="email"
                          value={this.props.fieldValues.email}
                          validations="isEmail"
                          validationError={emailError}
                          required
                          floatingLabelText="Email"
                          ref={(email) => {this._email = email}}
                          style={inputStyle} />
            </div>
          </div>

          <div className="spacer-medium"></div>
          <StepButtons data={data}
                       handleEdit={this.props.handleEdit}
                       handleNext={this.props.handleNext}
                       handlePrev={this.props.handlePrev}
                       saveValues={this.props.saveValues}
                       stepIndex={this.props.stepIndex}
                       reviewing={this.props.reviewing} />

        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Contact;