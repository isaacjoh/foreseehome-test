import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {FormsyText} from 'formsy-material-ui/lib';

// import HorizontalLinearStepper
import HorizontalLinearStepper from './Steps/Form.js';

//form wrapper
import Formsy from 'formsy-react';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.handleRequestClose = this.handleRequestClose.bind(this);
    // this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      goToForm: false,
      hasRxId: false,
      rxId: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  shouldOpenForm(){
    this.setState({
      goToForm: !this.state.goToForm
    });
  }

  isDisabled(){
    if(this.state.rxId){
      this.setState({
        hasRxId: true
      })
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  submitForm(data) {

  }

  render() {
    const {goToForm} = this.state;
    return (

      <div>
        { goToForm ? (
          <MuiThemeProvider muiTheme={muiTheme}>
            <Formsy.Form>
              <HorizontalLinearStepper />
            </Formsy.Form>
          </MuiThemeProvider>
          ) : (
            <MuiThemeProvider muiTheme={muiTheme}>
            <Card className="foresee-form">
              <h2> Welcome to ForeseeHome!</h2>
              <p>Thank you for taking the next step in AMD prevention. Let's complete your enrollment so that  you can begin monitoring as soon as possible.</p>

              <p>What is your Rx Number?</p>
              <TextField floatingLabelText="Rx Number"
                         floatingLabelStyle={{'fontFamily': 'acherus_grotesque_regular'}} />
              <IconButton className="physician-popover" tooltip="Image reference physician order form popover">
              <FontIcon className="material-icons">help</FontIcon>
              </IconButton>

              <div className="submit-btn-div">
                <RaisedButton label="Let's get started" primary={true} onClick={() => this.shouldOpenForm() } />
              </div>
            </Card>
          </MuiThemeProvider>
      )}
     </div>

    );
  }
}

export default Main;
