import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackgroundBubbles from '../components/BackgroundBubbles';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';
import CurrencyPairScreen from './CurrencyPairScreen';

const styles = {
  screenContainer:{
    height: '100vh',
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

  _openCurrencyPairModal(){
    const{ navigationStackController }=this.props;
    navigationStackController.pushModal(
      <CurrencyPairScreen 
        didChooseCurrencyPair={(pair)=>{console.log(pair)}}
      />
    );
  }

  _handelAddNewCurrencyButtonAction(){
    this._openCurrencyPairModal();
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
      isMobileView,
      screenWidth
    }=this.props;

    let screenContainerStyle = {
      ...styles.screenContainer,
      width: screenWidth
    }

    return (
      <div style={ screenContainerStyle }>
        <BackgroundBubbles />
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
  isMobileView: PropTypes.bool.isRequired,
  screenWidth: PropTypes.number.isRequired,
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
