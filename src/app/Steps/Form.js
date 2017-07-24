import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
  StepLabel
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import FormsyStub from '../Components/FormsyStub';

// form components
import Personal from './Personal/Personal';
import Contact from './Contact/Contact';
import Medicare from './Insurance/Medicare';
import Review from './Review/Review';
import Confirmation from './Confirmation/Confirmation';
import Prescription from './Prescription/Prescription';

const getStyles = () => {
  return {
    root: {
      width: '100%',
      maxWidth: 700,
      margin: 'auto',
    },
    content: {
      margin: '0 16px',
    },
    actions: {
      marginTop: 12,
    },
    backButton: {
      marginRight: 12,
    },
  };
};

/**
 * This is similar to the horizontal non-linear example, except the
 * `<Step>` components are being controlled manually via individual props.
 *
 * An enhancement made possible by this functionality (shown below),
 * is to permanently mark steps as complete once the user has satisfied the
 * application's required conditions (in this case, once it has visited the step).
 *
 */
class HorizontalLinearStepper extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      reviewing: false,
      stepIndex: 1,
      fieldValues: {
        name: null,
        dob: null,
        gender: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        phone: null,
        email: null,
        rxNumber: '',
        primaryInsFrontSrc: null,
        primaryInsBackSrc: null,
        secondaryInsFrontSrc: null,
        secondaryInsBackSrc: null,
        prescriptionSrc: null
      },
      width: window.innerWidth
    };
  }

  componentDidMount() {
    window.onbeforeunload = () => {
      return false;
    };
  }

  componentWillMount() {
    const {stepIndex} = this.state;
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUpdate(nextProps, nextState) {
    const {stepIndex} = nextState;

    // this.state.fieldValues is the final json object with all the user's input
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  handleEdit = (step) => {
    this.setState({
      stepIndex: step,
      reviewing: true
    });
  }

  handleNext = () => {
    const {stepIndex} = this.state;

    if (stepIndex < 6) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }

    if (stepIndex === 4) {
      this.setState({
        reviewing: true
      });
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 1) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  }

  getPrescriptionSrc = (src) => {
    let field_value = {
      prescriptionSrc: src
    }

    let fieldValues = this.state.fieldValues;
    fieldValues = Object.assign({}, fieldValues, field_value);

    this.setState({fieldValues: fieldValues});
  }

  getPrimaryScreenshotSrc = (src, insuranceType, reset) => {
    let field_value = {};

    if (reset) {
      field_value['primaryInsFrontSrc'] = null;
      field_value['primaryInsBackSrc'] = null;
      field_value['secondaryInsFrontSrc'] = null;
      field_value['secondaryInsBackSrc'] = null;
    } else {
      field_value[insuranceType] = src;
    }

    let fieldValues = this.state.fieldValues;
    fieldValues = Object.assign({}, fieldValues, field_value);

    this.setState({fieldValues: fieldValues});
  }

  saveValues = (field_value) => {
    let fieldValues = this.state.fieldValues;
    fieldValues = Object.assign({}, fieldValues, field_value);

    this.setState({fieldValues: fieldValues});
  }

  submitForm = () => {
    this.handleNext();
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return <Prescription getPrescriptionSrc={this.getPrescriptionSrc}
                             fieldValues={this.state.fieldValues}
                             handleEdit={this.handleEdit}
                             handleNext={this.handleNext}
                             handlePrev={this.handlePrev}
                             reviewing={this.state.reviewing}
                             saveValues={this.saveValues}
                             stepIndex={this.state.stepIndex} />;
      case 2:
        return <Personal fieldValues={this.state.fieldValues}
                         handleEdit={this.handleEdit}
                         handleNext={this.handleNext}
                         handlePrev={this.handlePrev}
                         reviewing={this.state.reviewing}
                         saveValues={this.saveValues}
                         stepIndex={this.state.stepIndex} /> ;
      case 3:
        return <Contact fieldValues={this.state.fieldValues}
                        handleEdit={this.handleEdit}
                        handleNext={this.handleNext}
                        handlePrev={this.handlePrev}
                        reviewing={this.state.reviewing}
                        saveValues={this.saveValues}
                        stepIndex={this.state.stepIndex} />;
      case 4:
        return <Medicare getPrimaryScreenshotSrc={this.getPrimaryScreenshotSrc}
                         handleEdit={this.handleEdit}
                         handleNext={this.handleNext}
                         handlePrev={this.handlePrev}
                         reviewing={this.state.reviewing}
                         saveValues={this.saveValues}
                         stepIndex={this.state.stepIndex} />;
      case 5:
        return <Review fieldValues={this.state.fieldValues}
                       handleEdit={this.handleEdit}
                       handleNext={this.handleNext}
                       handlePrev={this.handlePrev}
                       saveValues={this.saveValues}
                       submitForm={this.submitForm}
                       stepIndex={this.state.stepIndex} />;
      case 6:
        return <Confirmation fieldValues={this.state.fieldValues} />;
      }
  }

  render() {
    const { stepIndex, reviewing, width } = this.state;
    const styles = getStyles();
    const isMobile = width <= 500;
    let scroll = isMobile ? {'overflow': 'scroll'} : {};

    return (
      <div>
        <Stepper activeStep={stepIndex - 1} style={scroll}>
          <Step>
            <StepLabel>Prescription</StepLabel>
          </Step>
          <Step>
            <StepLabel>Personal</StepLabel>
          </Step>
          <Step>
            <StepLabel>Contact</StepLabel>
          </Step>
          <Step>
            <StepLabel>Insurance</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>

        <FormsyStub>
          <div style={styles.content}>
            {this.getStepContent(stepIndex)}
          </div>
        </FormsyStub>
      </div>
    );
  }
}

export default HorizontalLinearStepper;