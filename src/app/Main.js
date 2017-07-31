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

import ReactModal from 'react-modal';

// import HorizontalLinearStepper
import HorizontalLinearStepper from './Steps/Form.js';

//form wrapper
import Formsy from 'formsy-react';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  backButton: {
    marginRight: 12,
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      goToForm: false,
      hasRxId: false,
      rxId: null,
      showRx: false,
      showModal: false
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

  handleOpenModal () {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal () {
    this.setState({
      showModal: false
    });
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

  render() {
    const { goToForm, showRx } = this.state;
    return (

      <div>
        { goToForm ? (
          <MuiThemeProvider muiTheme={muiTheme}>
            <HorizontalLinearStepper />
          </MuiThemeProvider>
          ) : (
            <MuiThemeProvider muiTheme={muiTheme}>
              <Card className="foresee-form">
                <h2> Welcome to ForeseeHome!</h2>
                <p>Thank you for taking the next step in monitoring your AMD. Let's complete your enrollment so you can begin using ForeseeHome as soon as possible.</p>

                <div className="submit-btn-div">
                  <RaisedButton label="Let's get started"
                                primary={true}
                                labelStyle={{fontSize: '18px'}}
                                style={{height: '48px'}}
                                onClick={() => this.shouldOpenForm() } />
                </div>
              </Card>
            </MuiThemeProvider>
      )}
     </div>
    );
  }
}

export default Main;
