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
import Dropzone from 'react-dropzone'

import UploadImage from '../../Components/UploadImage';
import StepButtons from '../../Components/StepButtons';



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

  render() {
    return (
      <div>
        <Formsy.Form onValid={this.enableButton}
                     onInvalid={this.disableButton}>
          <div>
            <h3>Please take a picture of the <b>front</b> of your {this.state.insuranceType} insurance card</h3>
            <UploadImage getScreenshotSrc={this.getPrimaryScreenshotSrc} />
            <div className="spacer-small"></div>
          </div>

          <div>
            <h3>Please take a picture of the <b>back</b> of your {this.state.insuranceType} insurance card</h3>
            <UploadImage getScreenshotSrc={this.getSecondaryScreenshotSrc} />
          </div>

          { this.state.uploadComplete && this.props.primary ? (
            <div>
              <h3>Do you have a secondary form of health insurance?</h3>
              <RaisedButton label="Yes"
                            secondary={true}
                            style={styles.leftButton}
                            onTouchTap={() => this.props.handleOtherSecIns(true)} />
              <RaisedButton label="No"
                            secondary={true}
                            onTouchTap={() => this.props.handleEdit(5)} />
            </div>
          ) : (
            <div></div>
          )}

          {this.props.secondary ? (
            <div>
              <RaisedButton label="Back"
                            secondary={true}
                            style={styles.leftButton}
                            onTouchTap={() => {}} />
              <RaisedButton label="Next"
                            disabled={this.state.uploadComplete}
                            secondary={true}
                            onTouchTap={() => this.props.handleEdit(5)} />
            </div>
          ) : (
            <div></div>
          )}

          <div className="spacer"></div>
        </Formsy.Form>
      </div>
    );
  }
};

export default Insurance;