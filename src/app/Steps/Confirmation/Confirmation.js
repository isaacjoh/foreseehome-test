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
          <h2>Congratulations!</h2>

          <h4>We have your information and will process your order shortly.</h4>
          <h4>In the meantime, we encourage you to continue to learn more about AMD.</h4>

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
                href="http://foreseehome.com/patients.html"
                target="_blank"
              />
            </div>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  },
});

export default Confirmation;
