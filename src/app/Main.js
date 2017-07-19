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

const isMobile = window.innerWidth <= 767;
let rxDiv = {};
let rxImg = {
  bottom: '10%',
  height: 150,
  position: 'absolute',
  right: '12%',
  width: 300
};

if (isMobile) {
  rxDiv = {
    background: 'rgba(0, 0, 0, 0.4)',
    height: '100%',
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 2
  };

  rxImg = {
    bottom: 0,
    height: 150,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 300
  }
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  backButton: {
    marginRight: 12,
  }
};

styles.rxDiv = rxDiv;
styles.rxImg = rxImg;

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

  toggleShowRx(){
    this.setState({
      showRx: !this.state.showRx
    });
  }

  hideRx(){
    this.setState({
      showRx: false
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
                <p>Thank you for taking the next step in AMD prevention. Let's complete your enrollment so that  you can begin monitoring as soon as possible.</p>

                <p>What is your Rx Number?</p>
                <TextField floatingLabelText="Rx Number"
                           floatingLabelStyle={{'fontFamily': 'acherus_grotesque_regular'}} />
                <IconButton className="physician-popover" id="rx" onClick={() => this.toggleShowRx()}>
                  <FontIcon className="material-icons">help</FontIcon>
                </IconButton>

                {showRx ? (
                  <div style={styles.rxDiv} onClick={() => this.hideRx()}>
                    <img style={styles.rxImg} src="../www/static/img/rx_number.png" alt="" />
                  </div>
                ) : ''}

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
