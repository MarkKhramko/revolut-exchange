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
import CurrencyCarousel from '../components/Exchange/CurrencyCarousel';

import TopCurrencyCarouselSlide from '../components/Exchange/TopCurrencyCarouselSlide';
import BottomCurrencyCarouselSlide from '../components/Exchange/BottomCurrencyCarouselSlide';

import FullscreenDialog from 'material-ui-fullscreen-dialog'
import ExchangeRatesScreen from './ExchangeRatesScreen';

const styles = {
  screenContainer:{
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
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
  },

  dialogTopBar:{
    backgroundColor: '##0251A9',
    fontSize: 19,
    letterSpacing: '0.02em'
  }
}

class ExchangeScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isRateModalOpen: false
    }
  }

	componentWillMount(){
    // Currencies.forEach((currency, index)=>{
    //   console.log(index, currency);
    // })
	}

  componentDidMount() {
    // this._fetchCurrencyRates();
  }

  _openRatesModal(){
    let isRateModalOpen = true;
    this.setState({ isRateModalOpen });
  }

  _closeRatesModal(){
    let isRateModalOpen = false;
    this.setState({ isRateModalOpen });
  }

  // #section-begin Interactions
  _handleCancelButtonAction(){
    const{ navigationController }=this.props;
    navigationController.popView();
  }

  _handleRateButtonDidPress(){
    // this._openRatesModal();
    const{ navigationController }=this.props;
    navigationController.pushView(
      <ExchangeScreen/>,
      {
        transition: 5
      }
    )
  }

  _handleExchangeButtonAction(){
    let fromCurrency, toCurrency, amount;
  }
  // #section-end Interactions

  // #section-begin slides
  _topSlideExchangeAmountDidChange(amount, currencyData){
    console.log('did change', amount);
  }

  _renderTopCarouselSlide(currencyData, currencyAmount){
    let slider = 
      <TopCurrencyCarouselSlide 
        currencyData={ currencyData }
        currencyAmount={ currencyAmount }
        exchangeAmountDidChange={
          (amount, currencyData)=>this._topSlideExchangeAmountDidChange(amount, currencyData)
        }
      />;
    return slider;
  }

  _renderTopCarouselSlides(){

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

    let slides = [];
    for(let i=0; i<3; i++){
      let slide = this._renderTopCarouselSlide(
                    currencies[i],
                    amounts[i]
                  );
      slides.push(slide);
    }
    return slides;
  }

  _renderBottomCarouselSlide(currencyData){
    let slider = 
      <BottomCurrencyCarouselSlide 
        currencyData={ currencyData }
      />;
    return slider;
  }
  // #section-end slides

  render() {

    const {
      isRateModalOpen
    } = this.state;

    let topSlides = this._renderTopCarouselSlides();

    let bottomSlides = [
      this._renderBottomCarouselSlide(Currencies[4]),
      this._renderBottomCarouselSlide(Currencies[13]),
      this._renderBottomCarouselSlide(Currencies[48])
    ];

    return (
    	<div style={ styles.screenContainer }>
        <BackgroundBubbles />
        <div style={styles.topBarContainer}>
          <TopBar
            cancelButtonDidPress={()=>this._handleCancelButtonAction()}
            rateButtonDidPress={()=>this._handleRateButtonDidPress()}
            exchangeButtonDidPress={()=>this._handleExchangeButtonAction()}
          />
        </div>
        <div style={ styles.topCarouselContainer }>
          <CurrencyCarousel 
            slides={ topSlides }
            slideHeight='25.5vh'
          />
        </div>
        <div style={ styles.darkenedAreaContainer }>
          <DarkenedArea />
          <div style={ styles.bottomCarouselContainer }>
            <CurrencyCarousel 
              slides={ bottomSlides }
              slideHeight='25.5vh'
            />
          </div>
        </div>
        <FullscreenDialog
          open={isRateModalOpen}
          title="Select Currency 1"
          appBarStyle={ styles.dialogTopBar }
        >
          <ExchangeRatesScreen 
            didChooseCurrency={()=>{}}
          />
        </FullscreenDialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencyRate: state.currencyRate,
    userAccount: state.userAccount,
    exchangeHistory: state.exchangeHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccountActions: bindActionCreators(UserAccountActions, dispatch),
    exchangeHistoryActions: bindActionCreators(ExchangeHistoryActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeScreen);