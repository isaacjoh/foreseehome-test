import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Insurance from './Insurance';
import Insurance2 from './Insurance2';
import FlatButton from 'material-ui/FlatButton';

import StepButtons from '../../Components/StepButtons';

let paddingValue = 40;
const isMobile = window.innerWidth <= 767;

if (isMobile) {
  paddingValue = 25;
}

const styles = {
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
  leftButton: {
    height: '48px',
    marginRight: 12,
  }
}

const OtherInsurance = function(props){
  return (
    <div>
      <h3>Do you have another form of health insurance?</h3>
      <div>
        <RaisedButton label="Yes"
                      secondary={true}
                      labelStyle={{fontSize: '18px'}}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleOtherIns(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      labelStyle={{fontSize: '18px'}}
                      style={{height: '48px'}}
                      onTouchTap={() => props.handleOtherIns(false)} />
      </div>
      <div className="spacer"></div>
      <StepButtons data={{}}
                   insuring={true}
                   handleEdit={props.handleEdit}
                   saveValues={() => {}} />
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
                      labelStyle={{fontSize: '18px'}}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleOtherSecIns(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      labelStyle={{fontSize: '18px'}}
                      style={{height: '48px'}}
                      onTouchTap={() => props.handleEdit(5)} />
      </div>
      <div className="spacer"></div>
      <StepButtons data={{}}
                   insuring={true}
                   handleEdit={props.handleEdit}
                   saveValues={() => {}} />
    </div>
  )
}

const MedicarePrimaryQuestion = function(props){
  return (
    <div>
      <h3>Do you have health insurance (e.g. Medicare)?</h3>
      <div>
        <RaisedButton label="Yes"
                      secondary={true}
                      labelStyle={{fontSize: '18px'}}
                      style={styles.leftButton}
                      onTouchTap={() => props.handleMedicarePrim(true)} />
        <RaisedButton label="No"
                      secondary={true}
                      labelStyle={{fontSize: '18px'}}
                      style={{height: '48px'}}
                      onTouchTap={() => props.handleNext('all')} />
      </div>
      <div className="spacer"></div>
      <StepButtons data={{}}
                   backOnly={true}
                   handlePrev={props.handlePrev}
                   saveValues={() => {}} />
    </div>
  )
}

const NoInsurance = function(props){
  return (
    <div>
      <p>
        Even though you have no insurance, we may be able to help.
      </p>
      <p>
        Please call 1-800-XXX-XXXX to discuss your options.
      </p>
      <div className="spacer"></div>
      <div>
        <FlatButton
          label="Back"
          onTouchTap={() => props.handleEdit(3)}
          labelStyle={{fontSize: '18px'}}
          style={styles.leftButton}
        />
        <RaisedButton
          label="Home"
          primary={true}
          labelStyle={{fontSize: '18px'}}
          style={{height: '48px'}}
          onTouchTap={() => window.location.reload()}
        />
      </div>
    </div>
  )
}

class Medicare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasOtherIns: null,
      hasOtherSecIns: null,
      isMedicarePrim: null
    }

    this.handleReset = this.handleReset.bind(this);
    this.handleOtherSecIns = this.handleOtherSecIns.bind(this);
    this.handleMedicarePrim = this.handleMedicarePrim.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleNext = this.handleNext.bind(this);
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

  handleEdit(step){
    this.setState({
      hasOtherIns: null,
      hasOtherSecIns: null,
      isMedicarePrim: null
    });

    this.props.handleEdit(step);
  }

  handleNext(reset){
    if (reset) {
      this.props.getPrimaryScreenshotSrc(null, '', reset);
    }
    this.props.handleNext();
  }

  handleReset(option){
    if (option === 1) {
      this.setState({
        isMedicarePrim: null
      });
    }

    if (option === 2) {
      this.setState({
        hasOtherSecIns: null
      });
    }
  }

  getInsuranceSubStep(){
    if (this.state.hasOtherSecIns === true) {
      return ( <Insurance2 primary={false}
                           secondary={true}
                           fieldValues={this.props.fieldValues}
                           handleShortcut={this.props.handleShortcut}
                           getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                           handleEdit={this.handleEdit}
                           handleNext={this.props.handleNext}
                           handlePrev={this.props.handlePrev}
                           reviewing={this.props.reviewing}
                           reset={this.handleReset}
                           saveValues={this.props.saveValues}
                           stepIndex={this.props.stepIndex} /> )
    }

    if(this.state.isMedicarePrim === null) {
      return ( <MedicarePrimaryQuestion handleNext={this.handleNext}
                                        handlePrev={this.props.handlePrev}
                                        handleMedicarePrim={this.handleMedicarePrim} /> )
    }

    if(this.state.isMedicarePrim === true) {
      return ( <Insurance primary={true}
                          secondary={false}
                          fieldValues={this.props.fieldValues}
                          handleShortcut={this.props.handleShortcut}
                          getPrimaryScreenshotSrc={this.props.getPrimaryScreenshotSrc}
                          handleOtherSecIns={this.handleOtherSecIns}
                          handleEdit={this.handleEdit}
                          handleNext={this.handleNext}
                          handlePrev={this.props.handlePrev}
                          reviewing={this.props.reviewing}
                          reset={this.handleReset}
                          saveValues={this.props.saveValues}
                          stepIndex={this.props.stepIndex} /> )
    }
  }

  render() {
    let { paperStyle, switchStyle, submitStyle } = styles;

    let data = {};

    if (this._insuranceInfo) {
      data = {
        insuranceInfo: this._insuranceInfo.state.value
      };
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <h2>Step 4: Insurance Information</h2>
          {this.getInsuranceSubStep()}
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default Medicare;
