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

  componentDidMount() {
    // this._openRatesScreen();
  }

  // #section-begin Exchange Operations
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

  _getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount){
    const{
      currencyRate
    }=this.props;

    // Translate first currency to base currency
    let fromCurrencyRate = currencyRate.rates[fromCurrency.Code]; //0.850468
    let toCurrencyRate = currencyRate.rates[toCurrency.Code];
    let toCurrencyAmount = toCurrencyRate * reducedAmount;
    let receivedAmount = toCurrencyAmount/fromCurrencyRate;
    
    return receivedAmount;
  }

  _addTransactionToHistory(fromCurrency, toCurrency, reducedAmount, receivedAmount){
    const{
      exchangeHistoryActions
    }=this.props;

    let transaction = {
      from: fromCurrency,
      to: toCurrency,
      reducedAmount: reducedAmount,
      receivedAmount: receivedAmount,
      timestamp: new Date()
    };

    exchangeHistoryActions.addTransaction(transaction);
  }

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
    const{ navigationStackController }=this.props;
    navigationStackController.pop();
  }

  _openRatesScreen(){
    const{ navigationStackController, isMobileView }=this.props;
    navigationStackController.push(
      <ExchangeRatesScreen
        isMobileView={isMobileView}
        cancelButtonDidPress={()=>{}}
      />
    );
  }
  // #section-end Navigation

  // #section-begin Interactions
  _handleCancelButtonAction(){
    this._dismissThisScreen();
  }

  _handleRateButtonDidPress(){
    this._openRatesScreen();
  }

  _handleExchangeButtonAction(){

    let fromCurrency = this.topCarousel.getCurrencyData();
    let reducedAmount = this.topCarousel.getExchangeAmount();

    if(this._validateReduction(fromCurrency, reducedAmount)){

      let toCurrency = this.bottomCarousel.getCurrencyData();

      let receivedAmount = this._getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount);
      this._changeUserAccountBalance(fromCurrency, toCurrency, reducedAmount, receivedAmount);
      this._addTransactionToHistory(fromCurrency, toCurrency, reducedAmount, receivedAmount);

      const {
        isMobileView
      }=this.props;

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
    if(this.topCarousel){

      receivedAmounts = [];
      let fromCurrency = topCarouselCurrency;
      let reducedAmount = topCarouselAmount;

      for(let i=0; i<3; i++){
        let toCurrency = currencies[i];
        receivedAmounts.push(this._getReceivedAmountByLastCurrencyRate(fromCurrency, toCurrency, reducedAmount));
      }
    }
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
            cancelButtonDidPress={()=>this._handleCancelButtonAction()}
            rateButtonDidPress={()=>this._handleRateButtonDidPress()}
            exchangeButtonDidPress={()=>this._handleExchangeButtonAction()}
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