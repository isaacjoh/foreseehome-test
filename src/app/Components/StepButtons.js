import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FormsyStub from './FormsyStub';

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
      height: '48px'
    },
  };
};

class StepButtons extends React.Component {
  handleEdit = (step) => {
    this.props.saveValues(this.props.data);
    this.props.handleEdit(step);
  }

  handleNext = (e) => {
    e.preventDefault();

    this.props.saveValues(this.props.data);
    this.props.handleNext();
  }

  handlePrev = (e) => {
    e.preventDefault();

    this.props.saveValues(this.props.data);
    this.props.handlePrev();
  }

  render() {
    const styles = getStyles();

    return (
      <FormsyStub>
        {<div className="step-buttons">
          {this.props.stepIndex !== null && !this.props.reviewing && !this.props.insuring && !this.props.rxNumber && (
            <div style={styles.actions}>
              <FlatButton
                className={this.props.stepIndex !== 1 ? '' : 'hide'}
                label="Back"
                onTouchTap={this.handlePrev}
                labelStyle={{fontSize: '18px'}}
                style={styles.backButton}
              />
              <RaisedButton
                className={this.props.backOnly ? 'hide' : ''}
                disabled={!this.props.validated}
                label={this.props.stepIndex === 5 ? 'Done!' : 'Next'}
                primary={true}
                labelStyle={{fontSize: '18px'}}
                style={{height: '48px'}}
                onTouchTap={this.handleNext}
              />
            </div>
          )}

          {this.props.reviewing === true && (
            <div style={styles.actions}>
              <FlatButton
                className={this.props.stepIndex !== 1 ? '' : 'hide'}
                label="Back"
                onTouchTap={this.handlePrev}
                labelStyle={{fontSize: '18px'}}
                style={styles.backButton}
              />
              <RaisedButton
                disabled={!this.props.validated}
                label="Save"
                primary={true}
                labelStyle={{fontSize: '18px'}}
                style={{height: '48px'}}
                onTouchTap={() => this.handleEdit(5)}
              />
            </div>
          )}

          {this.props.insuring === true && (
            <div style={styles.actions}>
              <FlatButton
                label="Back"
                onTouchTap={() => this.handleEdit(3)}
                labelStyle={{fontSize: '18px'}}
                style={styles.backButton}
              />
              <RaisedButton
                disabled={!this.props.validated}
                label="Next"
                primary={true}
                labelStyle={{fontSize: '18px'}}
                style={{height: '48px'}}
                onTouchTap={() => this.handleEdit(4)}
              />
            </div>
          )}

          {this.props.rxNumber === true && (
            <div style={styles.actions}>
              <FlatButton
                label="Back"
                onTouchTap={() => this.props.handleShortcut(1)}
                labelStyle={{fontSize: '18px'}}
                style={styles.backButton}
              />
              <RaisedButton
                disabled={!this.props.validated}
                label="Next"
                primary={true}
                labelStyle={{fontSize: '18px'}}
                style={{height: '48px'}}
                onTouchTap={this.handleNext}
              />
            </div>
          )}
        </div>}
      </FormsyStub>
    )
  }
}

export default StepButtons;