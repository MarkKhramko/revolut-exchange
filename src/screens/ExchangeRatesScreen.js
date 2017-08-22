import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CurrencyPairActions from '../actions/currencyPairActions';

import BackgroundBubbles from '../components/BackgroundBubbles';
import TopBar from '../components/ExchangeRates/TopBar';
import {List} from 'material-ui/List';
import RateListItem from '../components/ExchangeRates/RateListItem';
import FlatButton from 'material-ui/FlatButton';

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

  buttonContainer:{
    textAlign: 'center',
    padding: '10vh'
  },

  button: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#0D55A5'
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

  // #section-begin Navigation
  _dismissThisScreen(){
    const{ navigationStackController }=this.props;
    navigationStackController.pop();
  }

  _openCurrencyPairModal(){
    const{ navigationStackController }=this.props;
    navigationStackController.pushModal(
      <CurrencyPairScreen />
    );
  }
  // #section-end Navigation

  _getExchangeRate(fromCurrency, toCurrency){
    const{
      currencyRate
    }=this.props;

    let fromCurrencyRate = currencyRate.rates[fromCurrency.Code]; //0.850468
    let toCurrencyRate = currencyRate.rates[toCurrency.Code];
    let exchangeRate = toCurrencyRate/fromCurrencyRate;
    
    return exchangeRate;
  }

  _handleCancelButtonAction(){
    this._dismissThisScreen();
  }

  _handleAddNewCurrencyButtonAction(){
    this._openCurrencyPairModal();
  }

  _handleListClick(currency, index){
  }

  _renderListItems(currencyPairs){
    let listItems = [];

    currencyPairs.forEach((pair)=>{

      console.log(pair);

      let fromCurrency = pair.fromCurrency;
      let toCurrency = pair.toCurrency;

      let currencyPairData = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: this._getExchangeRate(fromCurrency, toCurrency)
      }

      let listItem = 
        <RateListItem
          key={ pair.id }
          currencyPairData={ currencyPairData }
        />;
      listItems.push(listItem);
    });

    // Last row will contain button to add new pairs
    listItems.push(
      <div 
        key="PseudoKey"
        style={ styles.buttonContainer }
      >
        <FlatButton
          label="ADD NEW CURRENCY"
          onTouchTap={()=>this._handleAddNewCurrencyButtonAction()}
          hoverColor="#083c77"
          labelStyle={ styles.buttonLabel }
          style={styles.button}
        />
      </div>
    );

    return listItems;
  }

  render() {
    const{
      isCurrencyPairDialogOpen,
      dialogTitle
    } = this.state;

    const{
      currencyPair,
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
        <TopBar
          title="Rates"
          didPressCancelButton={()=>this._handleCancelButtonAction()}
        />
        <List>
          { this._renderListItems(currencyPair.pairs) }
        </List>
      </div>
    );
  }
}

ExchangeRatesScreen.propTypes = {
  isMobileView: PropTypes.bool.isRequired,
  screenWidth: PropTypes.number.isRequired,
};

ExchangeRatesScreen.defaultPropTypes = {
  isMobileView: true
};

function mapStateToProps(state) {
  return {
    currencyRate: state.currencyRate,
    currencyPair: state.currencyPair
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currencyPairActions: bindActionCreators(CurrencyPairActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeRatesScreen);
