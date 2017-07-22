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
    marginRight: 12
  }
}

class Insurance2 extends React.Component {
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

    window.scrollTo(0, 0);
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
            <div className="spacer-small"></div>
          </div>

          {this.props.secondary && this.state.uploadComplete ? (
            <div>
              <FlatButton label="Back"
                          style={styles.leftButton}
                          onTouchTap={() => {this.props.handleEdit(4)}} />
              <RaisedButton label="Next"
                            disabled={!this.state.uploadComplete}
                            primary={true}
                            onTouchTap={() => {this.props.handleEdit(5)}} />
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

export default Insurance2;