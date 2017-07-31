// imp

import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const getStyles = () => {
  const stylesObj = {
    actions: {
      marginTop: 12,
    },
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
    redBorder: {
      border: '1px solid red',
      padding: '3px 7px',
      textAlign: 'center'
    }
  };

  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    stylesObj.backButton = {
      marginBottom: 15
    };

    stylesObj.paperStyle = {
      width: 'auto',
      margin: 'auto',
      padding: 25
    }
  } else {
    stylesObj.backButton = {
      height: '48px',
      marginRight: 12
    }
  }

  return stylesObj;
};

const Confirmation = React.createClass({
  componentDidMount() {
    window.scrollTo(0, 0);
    window.onbeforeunload = () => { };
  },

  render() {
    const styles = getStyles();

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={styles.paperStyle}>
          <h2>Thank You!</h2>

          <div className="confirmation-text">
            <p>Congratulations on <i>taking your first step toward preserving vision</i>! We have received your ForeseeHome enrollment.</p>

            {
              this.props.fieldValues.primaryInsFrontSrc ? (
                <div>
                  <p>A Notal Vision Enrollment Specialist will be contacting you within 24-48 hours. If you need immediate assistance, please call Customer Service at 1-888-910-2020.</p>
                  <p>In the meantime, we encourage you to continue to learn more about AMD and ForeseeHome.</p>
                </div>
              ) : (
                <div style={styles.redBorder}>
                  <p>
                    <b>In order for us to complete your enrollment</b>, please contact the Notal Vision Customer Service Team at 1-888-910-2020.
                  </p>
                </div>
              )
            }
          </div>

          <iframe src="https://player.vimeo.com/video/77988968" frameBorder="0"></iframe>

          <div className="step-buttons text-center">
            <div style={styles.actions}>
              <RaisedButton
                label="Let's learn more!"
                primary={true}
                labelStyle={{fontSize: '18px'}}
                style={styles.backButton}
                href="http://foreseehome.com/amd-resources.html"
                target="_blank"
              />
              <FlatButton
                label="Home"
                labelStyle={{fontSize: '18px'}}
                style={{height: '48px'}}
                onTouchTap={() => window.location.reload()}
              />
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Confirmation;
