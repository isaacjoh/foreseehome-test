import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone'

import UploadImage from '../../Components/UploadImage';
import StepButtons from '../../Components/StepButtons';

const styles = {
  leftButton: {
    height: '48px',
    marginRight: 12
  }
}

class Insurance extends React.Component {
  constructor(props) {
    super(props);

    let insuranceType = props.primary === true ? 'primary' : 'secondary';

    this.state = {
      canSubmit: false,
      insuranceType: insuranceType,
      InsFrontSrc: null,
      InsBackSrc: null,
      shipState: '',
      uploadComplete: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const {stepIndex} = nextState;
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  getPrimaryScreenshotSrc = (src) => {
    this.setState({InsFrontSrc: src}, () => this.onUploadComplete());
    this.props.getPrimaryScreenshotSrc(src, this.state.insuranceType + 'InsFrontSrc');
  }

  getSecondaryScreenshotSrc = (src) => {
    this.setState({InsBackSrc: src}, () => this.onUploadComplete());
    this.props.getPrimaryScreenshotSrc(src, this.state.insuranceType + 'InsBackSrc');
  }

  onUploadComplete = () => {
    if (this.state.InsFrontSrc && this.state.InsBackSrc) {
      this.setState({uploadComplete: true});
    }
    else {
      this.setState({uploadComplete: false});
    }
  }

  handleOtherSecIns = (response) => {
    this.setState({
      canSubmit: false,
      InsFrontSrc: null,
      InsBackSrc: null,
      insuranceType: 'secondary',
      shipState: '',
      uploadComplete: false
    });

    this.props.handleOtherSecIns(response);
  }

  clearSecondaryIns = () => {
    this.props.handleNext('secondary');
  }

  render() {
    return (
      <div>
        <Formsy.Form onValid={this.enableButton}
                     onInvalid={this.disableButton}>
          <div>
            <h3>Please take a picture of the <b>front</b> of your {this.state.insuranceType} insurance card</h3>
            <UploadImage imagePreviewUrl={this.props.fieldValues[this.state.insuranceType + 'InsFrontSrc']}
                         getScreenshotSrc={(img) => this.getPrimaryScreenshotSrc(img)} />
            <div className="spacer-small"></div>
          </div>

          <div>
            <h3>Please take a picture of the <b>back</b> of your {this.state.insuranceType} insurance card</h3>
            <UploadImage imagePreviewUrl={this.props.fieldValues[this.state.insuranceType + 'InsBackSrc']}
                         getScreenshotSrc={(img) => this.getSecondaryScreenshotSrc(img)} />
          </div>

          { this.state.uploadComplete && this.props.primary ? (
            <div>
              <div className="spacer-medium"></div>
              <h3>Do you have a secondary form of health insurance?</h3>
              <RaisedButton label="Yes"
                            secondary={true}
                            labelStyle={{fontSize: '18px'}}
                            style={styles.leftButton}
                            onTouchTap={() => this.handleOtherSecIns(true)} />
              <RaisedButton label="No"
                            secondary={true}
                            labelStyle={{fontSize: '18px'}}
                            style={{height: '48px'}}
                            onTouchTap={() => this.clearSecondaryIns()} />
              <div className="spacer-small"></div>
            </div>
          ) : (
            <div></div>
          )}

          <div>
            <div className="spacer-medium"></div>
            <FlatButton label="Back"
                        labelStyle={{fontSize: '18px'}}
                        style={styles.leftButton}
                        onTouchTap={() => this.props.reset(1)} />
          </div>

          <div className="spacer-small"></div>
        </Formsy.Form>
      </div>
    );
  }
};

export default Insurance;