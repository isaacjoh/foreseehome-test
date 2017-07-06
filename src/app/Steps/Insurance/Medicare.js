import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Insurance from './Insurance';
import FlatButton from 'material-ui/FlatButton';

import StepButtons from '../../Components/StepButtons';

const styles = {
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
  leftButton: {
    marginRight: 12,
  }
}

const MedicareQuestion = function(props){
  return (
    <div>
      <h3>Do you have Medicare?</h3>
      <div>
        <RaisedButton label="Yes"
                      secondary={true}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleMedicare(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      onTouchTap={() => props.handleMedicare(false)} />
      </div>
      <div className="spacer"></div>
    </div>
  )
}

const OtherInsurance = function(props){
  return (
    <div>
      <h3>Do you have another form of health insurance?</h3>
      <div>
        <RaisedButton label="Yes"
                      secondary={true}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleOtherIns(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      onTouchTap={() => props.handleOtherIns(false)} />
      </div>
      <div className="spacer"></div>
    </div>
  )
}

const OtherSecondaryInsurance = function(props){
  return (
    <div>
      <h3>Do you have a secondary form of health insurance?</h3>
      <div>
        <RaisedButton label="Yes"
                      secondary={true}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleOtherSecIns(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      onTouchTap={() => props.handleOtherSecIns(false)} />
      </div>
      <div className="spacer"></div>
    </div>
  )
}

const MedicarePrimaryQuestion = function(props){
  return (
    <div>
      <h3>Is Medicare your primary form of insurance?</h3>
        <div>
          <RaisedButton label="Yes"
                        secondary={true}
                        style={styles.leftButton}
                        onTouchTap={() => props.handleMedicarePrim(true)} />
          <RaisedButton label="No"
                        secondary={true}
                        onTouchTap={() => props.handleMedicarePrim(false)} />
      </div>
      <div className="spacer"></div>
    </div>
  )
}

class Medicare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMedicare: null,
      hasOtherIns: null,
      hasOtherSecIns: null,
      isMedicarePrim: null
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleMedicare(response){
    if(response === true){
      this.setState({hasMedicare: true});
    } else {
      this.setState({hasMedicare: false});
    }
  }

  handleMedicarePrim(response){
    if(response === true){
      this.setState({isMedicarePrim: true});
    } else {
      this.setState({isMedicarePrim: false});
    }
  }

  handleOtherIns(response){
    if(response === true){
      this.setState({hasOtherIns: true});
    } else {
      this.setState({hasOtherIns: false});
    }
  }

  handleOtherSecIns(response){
    if(response === true){
      this.setState({hasOtherSecIns: true});
    } else {
      this.setState({hasOtherSecIns: false});
    }
  }

  getInsuranceSubStep(){
    if (this.state.hasOtherSecIns === true) {
      return ( <Insurance primary={true}
                          secondary={true}
                          getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                          getSecondaryScreenshotSrc={this.props.getSecondaryScreenshotSrc}
                          handleEdit={this.props.handleEdit}
                          handleNext={this.props.handleNext}
                          handlePrev={this.props.handlePrev}
                          reviewing={this.props.reviewing}
                          saveValues={this.props.saveValues}
                          stepIndex={this.props.stepIndex} /> )
    }

    if (this.state.hasOtherSecIns === false) {
      return ( <Insurance primary={true}
                          secondary={false}
                          getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                          handleEdit={this.props.handleEdit}
                          handleNext={this.props.handleNext}
                          handlePrev={this.props.handlePrev}
                          reviewing={this.props.reviewing}
                          saveValues={this.props.saveValues}
                          stepIndex={this.props.stepIndex} /> )
    }

    if(this.state.isMedicarePrim === true || this.state.isMedicarePrim === false ) {
      return ( <Insurance primary={true}
                          secondary={true}
                          getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                          getSecondaryScreenshotSrc={this.props.getSecondaryScreenshotSrc}
                          handleEdit={this.props.handleEdit}
                          handleNext={this.props.handleNext}
                          handlePrev={this.props.handlePrev}
                          reviewing={this.props.reviewing}
                          saveValues={this.props.saveValues}
                          stepIndex={this.props.stepIndex} /> )
    }

    if(this.state.hasOtherIns === true) {
      if (this.state.hasMedicare === true) {
        return ( <MedicarePrimaryQuestion handleMedicarePrim={this.handleMedicarePrim.bind(this)} /> )
      }
      else {
        return ( <OtherSecondaryInsurance handleOtherSecIns={this.handleOtherSecIns.bind(this)} /> )
      }
    }

    if(this.state.hasOtherIns === false) {
      if (this.state.hasMedicare === true) {
        return ( <Insurance primary={true}
                            secondary={false}
                            getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                            handleEdit={this.props.handleEdit}
                            handleNext={this.props.handleNext}
                            handlePrev={this.props.handlePrev}
                            reviewing={this.props.reviewing}
                            saveValues={this.props.saveValues}
                            stepIndex={this.props.stepIndex} /> )
      }
      else {
        // when they don't have medicare or any other health insurance
        return ( <Insurance primary={false} secondary={false} /> )
      }
    }

    if(this.state.hasMedicare === null) {
      return ( <MedicareQuestion handleMedicare={this.handleMedicare.bind(this)}/> )
    }

    if(this.state.hasMedicare === true) {
      return ( <OtherInsurance handleOtherIns={this.handleOtherIns.bind(this)} /> )
    }

    if(this.state.hasMedicare === false) {
      return ( <OtherSecondaryInsurance handleOtherSecIns={this.handleOtherSecIns.bind(this)} /> )
    }

  }

  render() {
    let { paperStyle, switchStyle, submitStyle } = styles;

    let data = {};

    if (this._fullName) {
      data = {
        insuranceInfo: this._insuranceInfo.state.value
      };
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <h2>Step 3: Insurance Information</h2>
          {this.getInsuranceSubStep()}
        </Paper>
        </MuiThemeProvider>
    );
  }
}

export default Medicare;
