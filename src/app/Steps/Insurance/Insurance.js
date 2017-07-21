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
    this.state = {
      canSubmit: false,
      primaryInsFrontSrc: null,
      secondaryInsFrontSrc: null,
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
    this.setState({primaryInsFrontSrc: src}, () => this.onUploadComplete());
    this.props.getPrimaryScreenshotSrc(src);
  }

  getSecondaryScreenshotSrc = (src) => {
    this.setState({secondaryInsFrontSrc: src}, () => this.onUploadComplete());
    this.props.getSecondaryScreenshotSrc(src);
  }

  onUploadComplete = () => {
    if (this.props.secondary) {
      if (this.state.secondaryInsFrontSrc && this.state.primaryInsFrontSrc) {
        this.setState({uploadComplete: true});
      }
      else {
        this.setState({uploadComplete: false});
      }
    } else {
      if (this.state.primaryInsFrontSrc) {
        this.setState({uploadComplete: true});
      }
      else {
        this.setState({uploadComplete: false});
      }
    }
  }

  render() {
    return (
      <div>
        <Formsy.Form onValid={this.enableButton}
                     onInvalid={this.disableButton}>
          {this.props.primary === true && (
            <div>
              <h3>Please upload a picture of your primary insurance card</h3>
              <UploadImage getScreenshotSrc={this.getPrimaryScreenshotSrc} />
              <div className="spacer-small"></div>
            </div>
          )}

          {this.props.secondary === true && (
            <div>
              <h3>Please upload a picture of your secondary insurance card</h3>
              <UploadImage getScreenshotSrc={this.getSecondaryScreenshotSrc} />
            </div>
          )}

          <div className="spacer"></div>
          <StepButtons handleEdit={this.props.handleEdit}
                       handleNext={this.props.handleNext}
                       handlePrev={this.props.handlePrev}
                       insuring={true}
                       reviewing={this.props.reviewing}
                       saveValues={this.props.saveValues}
                       stepIndex={this.props.stepIndex}
                       validated={this.state.uploadComplete} />
        </Formsy.Form>
      </div>
    );
  }
};

export default Insurance;