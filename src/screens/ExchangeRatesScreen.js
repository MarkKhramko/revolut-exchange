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
    overflow: 'hidden',
    textAlign: 'center'
  },

  listContainer:{
    minHeight: '100vh',
    maxHeight: '100%',
    overflowY: 'scroll'
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
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: 40,
    marginBottom: 80,
    backgroundColor: 'transparent'
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

  // #section-begin Navigation
  /*
   * Remove current screen from navigation stack.
   */
  _dismissThisScreen(){
    const{
      navigationStackController 
    }=this.props;
    navigationStackController.pop();
  }

  /*
   * Present CurrencyPairScreen as modal.
   */
  _openCurrencyPairModal(){
    const{
      navigationStackController,
      isMobileView
    }=this.props;

    navigationStackController.pushModal(
      <CurrencyPairScreen
        isMobileView={ isMobileView }
      />
    );
  }
  // #section-end Navigation

  /**
   * Convert money from currency to curreny by last available rate.
   * @param {Object} fromCurrency - Currency that User wants to exchange. 
   * @param {Object} toCurrency - Currency, User wants to receive. 
   * @returns {number} Result of convertation.
   */
  _getExchangeRate(fromCurrency, toCurrency){
    const{
      currencyRate
    }=this.props;

    let fromCurrencyRate = currencyRate.rates[fromCurrency.Code];
    let toCurrencyRate = currencyRate.rates[toCurrency.Code];
    let exchangeRate = toCurrencyRate/fromCurrencyRate;
    
    return exchangeRate;
  }

  // #section-begin Interactions
  _handleCancelButtonAction(){
    this._dismissThisScreen();
  }

  _handleAddNewCurrencyButtonAction(){
    this._openCurrencyPairModal();
  }
  // #section-end Interactions

   /**
   * Creates RateListItem array. Each item filled with currency pair data.
   *
   * @param {Array} currencyPairs - Array of arrays of two currencies that User choose.
   * @returns {Array}
   */
  _renderListItems(currencyPairs){

    let listItems = [];
    currencyPairs.forEach((pair)=>{

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

    // Last row will contain div with button to add new pairs
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
        <BackgroundBubbles
          shouldFitWidth={!isMobileView}
        />
        <TopBar
          title="Rates"
          didPressCancelButton={()=>this._handleCancelButtonAction()}
        />
        <div style={ styles.listContainer }>
          <List>
            { this._renderListItems(currencyPair.pairs) }
          </List>
        </div>
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
