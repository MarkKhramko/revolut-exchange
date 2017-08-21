import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackgroundBubbles from '../components/BackgroundBubbles';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import FullscreenDialog from 'material-ui-fullscreen-dialog'
import Dialog from 'material-ui/Dialog';
import CurrencyPairScreen from './CurrencyPairScreen';

const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  dialogTopBar:{
    backgroundColor: '##0251A9',
    fontSize: 19,
    letterSpacing: '0.02em'
  },

  listContainer:{
    marginTop: 65,
    height: '100%',
    overflow: 'scroll'
  },

  listItem:{
    color:'white',
    textAlign: 'left',
    letterSpacing: '0.02em',
    borderBottom: 'solid',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },

  button: {
    borderRadius: 5,
    padding: 0
  },

  buttonLabel:{
    color: 'white',
    fontSize: '0.75em',
    letterSpacing: '0.05em',
    padding: 2
  }
}

class ExchangeRatesScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isCurrencyPairDialogOpen: false,
      dialogTitle: "Select Currency 1"
    }
  }

  _handelAddNewCurrencyButtonAction(){
    let isCurrencyPairDialogOpen = true;
    this.setState({ isCurrencyPairDialogOpen });
  }

  _handleCurrencyPairCloseRequest(){
    let isCurrencyPairDialogOpen = false;
    this.setState({ isCurrencyPairDialogOpen });
  }

  _handleListClick(currency, index){
  }

  render() {
    const{
      isCurrencyPairDialogOpen,
      dialogTitle
    } = this.state;

    const{
      isMobileView
    }=this.props;

    let currencyPairDialog;
    if(isMobileView){
      currencyPairDialog = 
      <FullscreenDialog
          open={ isCurrencyPairDialogOpen }
          title={ dialogTitle }
          appBarStyle={ styles.dialogTopBar }
        >
          <CurrencyPairScreen 
            didChooseCurrency={()=>{}}
          />
      </FullscreenDialog>;
    }
    else{
      currencyPairDialog =
      <Dialog
          title={ dialogTitle }
          modal={false}
          open={ isCurrencyPairDialogOpen }
          autoScrollBodyContent={true}
          appBarStyle={ styles.dialogTopBar }
          onRequestClose={()=>this._handleCurrencyPairCloseRequest()}
        >
          <CurrencyPairScreen 
            didChooseCurrency={()=>{}}
          />
      </Dialog>;
    }

    return (
      <div style={ styles.screenContainer }>
        <BackgroundBubbles />
        {currencyPairDialog}
        <List>
          
        </List>
        <FlatButton
            label="ADD NEW CURRENCY"
            onTouchTap={()=>this._handelAddNewCurrencyButtonAction()}
            hoverColor="#0D55A5"
            labelStyle={ styles.buttonLabel }
            style={styles.button}
          />
      </div>
    );
  }
}

ExchangeRatesScreen.propTypes = {
  cancelButtonDidPress: PropTypes.func.isRequired,
  isMobileView: PropTypes.bool.isRequired
};

ExchangeRatesScreen.defaultPropTypes = {
  isMobileView: true
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRatesScreen);
