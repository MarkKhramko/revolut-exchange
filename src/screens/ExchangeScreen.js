import React, { Component } from "react";
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserAccountActions from '../actions/userAccountActions';
import * as ExchangeHistoryActions from '../actions/exchangeHistoryActions';

import {Currencies} from '../constants/Currencies';

import BackgroundBubbles from '../components/BackgroundBubbles';
import TopBar from '../components/Exchange/TopBar';
import DarkenedArea from '../components/Exchange/DarkenedArea';

import TopCurrencyCarousel from '../components/Exchange/TopCurrencyCarousel';
import BottomCurrencyCarousel from '../components/Exchange/BottomCurrencyCarousel';

import ExchangeRatesScreen from './ExchangeRatesScreen';

const styles = {
  screenContainer:{
    height: '100vh'
  },

  topBarContainer:{
    position: 'relative',
    display: 'block',
    width: '100%',
    height: TopBar.BAR_HEIGHT,
  },

  topCarouselContainer:{
    padding: 32
  },

  bottomCarouselContainer:{
    padding: 32,
    paddingTop: '14%'
  },

  darkenedAreaContainer:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%'
  }
}

class ExchangeScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      topCarouselAmount: 0,
      topCarouselCurrency: Currencies[48], // USD
      bottomCarouselCurrency: Currencies[4]
    }

    // References, that will be set after first render call
    this.topCarousel;
    this.bottomCarousel;
  }

  // #section-begin Exchange Operations
  /**
   * Check if amount that User wants to exchange bigger than zero and check if user have amount of money, that he wants to exchange.
   * @param {Object} currencyData - Currency that User wants to exchange. 
   * @param {number} reducedAmount - Amount of money that User wants to exchange
   * @returns {bool} If true - passed validation.
   */
  _validateReduction(currencyData, reducedAmount){
    const{
      userAccount
    }=this.props;

    if(reducedAmount > 0){
      let accountCurrencyAmount = userAccount.amount[currencyData.Code];
      if(accountCurrencyAmount >= reducedAmount){
        return true;
      }
    }
    return false;
  }

  /**
   * Convert money from currency to curreny by last available rate.
   * @param {Object} fromCurrency - Currency that User wants to exchange. 
   * @param {Object} toCurrency - Currency, User wants to receive. 
   * @param {number} reducedAmount - Amount of money that User wants to exchange
   * @returns {number} Result of convertation.
   */
  _getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount){
    const{
      currencyRate
    }=this.props;

    let fromCurrencyRate = currencyRate.rates[fromCurrency.Code];
    let toCurrencyRate = currencyRate.rates[toCurrency.Code];
    let toCurrencyAmount = toCurrencyRate * reducedAmount;
    let receivedAmount = toCurrencyAmount/fromCurrencyRate;
    
    return receivedAmount;
  }

  /**
   * Saves information about transaction to global state.
   * @param {Object} fromCurrency - Currency that User exchanged. 
   * @param {Object} toCurrency - Currency taht User received. 
   * @param {number} reducedAmount - Amount of money that exchanged.
   * @param {number} reducedAmount - Amount of money that received.
   */
  _addTransactionToHistory(fromCurrency, toCurrency, reducedAmount, receivedAmount){
    const{
      exchangeHistoryActions
    }=this.props;

    let transaction = {
      from: fromCurrency,
      to: toCurrency,
      reducedAmount: reducedAmount,
      receivedAmount: receivedAmount,
      timestamp: new Date() //Current time
    };

    exchangeHistoryActions.addTransaction(transaction);
  }

  /**
   * Reduce amount of exchanged currency and add to received currency.
   * @param {Object} fromCurrency - Currency that User exchanged. 
   * @param {Object} toCurrency - Currency taht User received. 
   * @param {number} reducedAmount - Amount of money that exchanged.
   * @param {number} reducedAmount - Amount of money that received.
   */
  _changeUserAccountBalance(fromCurrency, toCurrency, reducedAmount, receivedAmount){
    const{
      userAccountActions
    }=this.props;

    userAccountActions.reduceAmount(reducedAmount, fromCurrency.Code);
    userAccountActions.addAmount(receivedAmount, toCurrency.Code);
  }
  // #section-end Exchange Operations

  // #section-begin Navigation
  _dismissThisScreen(){
    const{
      navigationStackController 
    }=this.props;
    navigationStackController.pop();
  }

  _openRatesScreen(){
    const{
      navigationStackController, 
      isMobileView 
    }=this.props;

    navigationStackController.push(
      <ExchangeRatesScreen
        isMobileView={isMobileView}
        didPressCancelButton={()=>{}}
      />
    );
  }
  // #section-end Navigation

  // #section-begin Interactions
  _handleCancelButtonAction(){
    this._dismissThisScreen();
  }

  _handleRateButtonAction(){
    this._openRatesScreen();
  }

  _handleExchangeButtonAction(){

    // Get currency that User selected.
    let fromCurrency = this.topCarousel.getCurrencyData();
    // Get amount that user entered.
    let reducedAmount = this.topCarousel.getExchangeAmount();

    // if amount that User wants to exchange bigger than zero
    // and if user have amount of money, that he wants to exchange.
    if(this._validateReduction(fromCurrency, reducedAmount)){

      let toCurrency = this.bottomCarousel.getCurrencyData();

      let receivedAmount = this._getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount);
      this._changeUserAccountBalance(fromCurrency, toCurrency, reducedAmount, receivedAmount);
      this._addTransactionToHistory(fromCurrency, toCurrency, reducedAmount, receivedAmount);

      const {
        isMobileView
      }=this.props;

      // If it is mobile layout, go back to exchange history screen.
      if(isMobileView){
        this._dismissThisScreen();
      }
    }
  }

  _handleExchangeAmountDidChange(topCarouselCurrency, topCarouselAmount){
    this.setState({ topCarouselAmount, topCarouselCurrency });
  }

  _handleSlideDidChange(topCarouselCurrency, topCarouselAmount){
    this.setState({ topCarouselAmount, topCarouselCurrency });
  }
  // #section-end Interactions

  // #section-begin Slides Data
  /**
   * Creates slides data object for top carousel. Each object contains props to pass to slide.
   * @returns {Array}
   */
  _getTopCarouselSlidesData(){

    const{ userAccount }=this.props;

    let currencies = [
      Currencies[48], // USD
      Currencies[4], // GBP
      Currencies[13] // EUR
    ];

    let amounts = [
      userAccount.amount[currencies[0].Code],
      userAccount.amount[currencies[1].Code],
      userAccount.amount[currencies[2].Code]
    ];

    let slidesData = [];
    for(let i=0; i<3; i++){

      let slideData = {
        currencyData: currencies[i],
        currencyAmount: amounts[i]
      };

      slidesData.push(slideData);
    }
    return slidesData;
  }

  /**
   * Creates slides data object for bottom carousel. Each object contains props to pass to slide.
   * @param {Object} topCarouselCurrency - Currency that User wants to exchange.
   * @param {Object} topCarouselAmount - Amount of currency that User wants to exchange.
   * @param {Object} userAccount - Object with all Users's currencies amounts.
   * @returns {Array}
   */
  _getBottomCarouselSlidesData(topCarouselCurrency, topCarouselAmount, userAccount){
    let currencies = [
      Currencies[4], // GBP
      Currencies[13], // EUR
      Currencies[48] // USD
    ];

    let amounts = [
      userAccount.amount[currencies[0].Code],
      userAccount.amount[currencies[1].Code],
      userAccount.amount[currencies[2].Code]
    ];

    let receivedAmounts;
    // If top carousel was mounted to DOM
    if(this.topCarousel){

      receivedAmounts = [];
      let fromCurrency = topCarouselCurrency;
      let reducedAmount = topCarouselAmount;

      for(let i=0; i<3; i++){
        let toCurrency = currencies[i];
        // Convert amount of currency that should be exchanged to new currency.
        receivedAmounts.push(this._getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount));
      }
    }
    // If top carousel wasn't mounted to DOM,
    // there were none currency selected and none amounts entered.
    else{
      receivedAmounts = [0,0,0];
    }

    let slidesData = [];
    for(let i=0; i<3; i++){

      let slideData = {
        currencyData: currencies[i],
        currencyAmount: amounts[i],
        receivedAmount: receivedAmounts[i]
      };

      slidesData.push(slideData);
    }
    return slidesData;
  }
  // #section-end Slides Data

  render() {

    const {
      isRateModalOpen,
      topCarouselCurrency,
      topCarouselAmount,
      bottomCarouselCurrency
    }=this.state;

    const {
      currencyRate,
      userAccount,
      isMobileView,
      screenWidth
    }=this.props;

    let topSlidesData = this._getTopCarouselSlidesData();
    let bottomSlidesData = this._getBottomCarouselSlidesData(topCarouselCurrency, topCarouselAmount, userAccount);

    let currentExchangeRate = this._getReceivedAmountByLastCurrencyRate(topCarouselCurrency, bottomCarouselCurrency, 1);

    let screenContainerStyle = {
      ...styles.screenContainer,
      width: screenWidth
    }

    return (
    	<div style={ screenContainerStyle }>
        <BackgroundBubbles />
        <div style={styles.topBarContainer}>
          <TopBar
            shouldHideCancelButton={!isMobileView}
            didPressCancelButton={()=>this._handleCancelButtonAction()}
            didPressRateButton={()=>this._handleRateButtonAction()}
            didPressExchangeButton={()=>this._handleExchangeButtonAction()}
            exchangeRate={currentExchangeRate}
            convertableCurrencyData={topCarouselCurrency}
            receivableCurrencyData={bottomCarouselCurrency}
          />
        </div>
        <div style={ styles.topCarouselContainer }>
          <TopCurrencyCarousel
            ref={(ref)=>this.topCarousel = ref}
            slidesData={ topSlidesData }
            slideHeight='25.5vh'
            exchangeAmountDidChange={(currencyData, amount)=>this._handleExchangeAmountDidChange(currencyData, amount)}
            slideDidChange={(currencyData, amount)=>this._handleSlideDidChange(currencyData, amount)}
          />
        </div>
        <div style={ styles.darkenedAreaContainer }>
          <DarkenedArea />
          <div style={ styles.bottomCarouselContainer }>
            <BottomCurrencyCarousel
              ref={(ref)=>this.bottomCarousel = ref}
              slidesData={ bottomSlidesData }
              slideHeight='25.5vh'
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencyRate: state.currencyRate,
    userAccount: state.userAccount,
    exchangeHistory: state.exchangeHistory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccountActions: bindActionCreators(UserAccountActions, dispatch),
    exchangeHistoryActions: bindActionCreators(ExchangeHistoryActions, dispatch)
  };
}

ExchangeScreen.props = {
  isMobileView: PropTypes.bool.isRequired,
  screenWidth: PropTypes.number.isRequired
}

ExchangeScreen.defaultProps ={
  isMobileView: true
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeScreen);