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
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import StepButtons from '../../Components/StepButtons';
import UploadImage from '../../Components/UploadImage';

let paddingValue = 40;
const isMobile = window.innerWidth <= 767;

let rxDiv = {};
let rxImg = {
  height: 150,
  position: 'absolute',
  right: 0,
  top: 0,
  width: 300
};

if (isMobile) {
  paddingValue = 25;

  rxDiv = {
    background: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 2
  };

  rxImg = {
    bottom: 0,
    height: 150,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 300
  }
}

let isTablet = window.innerWidth <= 1025;

const styles = {
  paperStyle: {
    width: 'auto',
    margin: 'auto',
    padding: paddingValue,
  },
  inputStyle: {
    width: '100%'
  },
  prescriptionSectionStyle: {
    marginBottom: 0,
    marginTop: 42
  },
  helperText: {
    color: '#373D3F',
    fontFamily: 'acherus_grotesque_regular'
  },
  leftButton: {
    marginRight: 12,
  }
}

styles.rxDiv = rxDiv;
styles.rxImg = rxImg;

const RxNumber = function(props){
  return (
    <div style={{position: 'relative'}}>
      <p>What is your Rx Number?</p>
      <FormsyText floatingLabelText="Rx Number"
                  floatingLabelStyle={{'fontFamily': 'acherus_grotesque_regular'}}
                  name="rxNumber"
                  value={props.fieldValues.rxNumber}
                  onChange={(ev, value) => props.checkInputValue(value)} />
      <IconButton className="physician-popover" id="rx" onClick={() => props.toggleShowRx()}>
        <FontIcon className="material-icons">help</FontIcon>
      </IconButton>

      {props.showRx ? (
        <div style={styles.rxDiv} onClick={() => props.hideRx()}>
          <img style={styles.rxImg} src="static/img/rx_number.png" alt="Image" />
        </div>
      ) : ''}

      <div className="spacer-small"></div>
    </div>
  )
}

const RxNumberUpload = function(props){
  return (
    <div>
      <h3>Please take a picture of your prescription</h3>
      <UploadImage getScreenshotSrc={props.getPrescriptionSrc} imagePreviewUrl={props.fieldValues.prescriptionSrc} />
      <div className="spacer-small"></div>

      <RaisedButton
        className={props.hasPrescription ? 'hide' : ''}
        label="I don't have one"
        primary={true}
        onTouchTap={props.enterRxNumber}
      />

      <div className="spacer-small"></div>
    </div>
  )
}

class Prescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      hasPrescription: false,
      showRx: false,
      reset: true,
      rxNumber: null
    }
  }

  checkInputValue(value) {
    if (value.length) {
      this.setState({
        rxNumber: value
      });
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  enterRxNumber() {
    isTablet = false;
    this.setState({
      reset: true
    });
  }

  enableButton() {
    this.setState({
      canSubmit: true,
      hasPrescription: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  hideRx(){
    this.setState({
      showRx: false
    });
  }

  toggleShowRx(){
    this.setState({
      showRx: !this.state.showRx
    });
  }

  getPrescriptionSrc(src){
    if (src) {
      this.enableButton();
      this.props.getPrescriptionSrc(src);
    }
  }

  getPrescriptionSubStep(){
    if (isTablet) {
      return ( <RxNumberUpload getPrescriptionSrc={this.getPrescriptionSrc.bind(this)}
                               enterRxNumber={this.enterRxNumber.bind(this)}
                               hasPrescription={this.state.hasPrescription}
                               fieldValues={this.props.fieldValues} /> )
    } else {
      return ( <RxNumber checkInputValue={this.checkInputValue.bind(this)}
                         showRx={this.state.showRx}
                         hideRx={this.hideRx.bind(this)}
                         fieldValues={this.props.fieldValues}
                         toggleShowRx={this.toggleShowRx.bind(this)} /> )
    }
  }

  render() {
    let { paperStyle, inputStyle, prescriptionSectionStyle, helperText } = styles;

    let data = {};

    if (this.state.rxNumber) {
      data = {
        rxNumber: this.state.rxNumber
      };
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <Formsy.Form>
            <h2>Step 1: Prescription Information</h2>
            {this.getPrescriptionSubStep()}

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
  }
};

export default Prescription;