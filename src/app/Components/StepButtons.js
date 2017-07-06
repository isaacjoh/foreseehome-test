import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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
      <div className="step-buttons">
        {this.props.stepIndex !== null && !this.props.reviewing && (
          <div style={styles.actions}>
            <FlatButton
              className={this.props.stepIndex !== 1 ? '' : 'hide'}
              label="Back"
              onTouchTap={this.handlePrev}
              style={styles.backButton}
            />
            <RaisedButton
              label={this.props.stepIndex === 4 ? 'Done!' : 'Next'}
              primary={true}
              onTouchTap={this.handleNext}
              type="submit"
            />
          </div>
        )}

        {this.props.reviewing === true && (
          <div style={styles.actions}>
            <FlatButton
              className={this.props.stepIndex !== 1 ? '' : 'hide'}
              label="Back"
              onTouchTap={this.handlePrev}
              style={styles.backButton}
            />
            <RaisedButton
              label="Save"
              primary={true}
              onTouchTap={() => this.handleEdit(4)}
            />
          </div>
        )}
      </div>
    )
  }
}

export default StepButtons;