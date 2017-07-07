// imp

import React from 'react';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

const Confirmation = React.createClass({

  styles: {
    actions: {
      marginTop: 12,
    },
    backButton: {
      marginRight: 12,
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
  },

  componentDidMount() {
    window.scrollTo(0, 0);
  },

  render() {
    let {paperStyle, switchStyle, submitStyle, actions, backButton } = this.styles;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Paper style={paperStyle}>
          <h2>Thank You!</h2>

          <div className="confirmation-text">
            <p>Congratulations on <i>taking your first step toward preserving vision</i>! We have received your ForeseeHome enrollment.</p>
            <p>A Notal Vision Enrollment Specialist will be contacting you within 24-48 hours. If you need immediate assistance, please call Customer Service at 1-888-910-2020.</p>
            <p>In the meantime, we encourage you to continue to learn more about AMD and ForeseeHome.</p>
          </div>

          <iframe src="https://player.vimeo.com/video/77988968" frameBorder="0"></iframe>

          <h5>Output Data</h5>
          <pre>{JSON.stringify(this.props.fieldValues, null, 2)}</pre>

          <div className="step-buttons text-center">
            <div style={actions}>
              <RaisedButton
                label="Let's learn more!"
                primary={true}
                style={backButton}
                href="http://foreseehome.com/amd-resources.html"
                target="_blank"
              />
              <FlatButton
                label="Home"
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
