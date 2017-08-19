import React, { Component } from "react";
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    position: 'absolute',
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
    Currencies.forEach((currency, index)=>{
      console.log(index, currency);
    })
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

  }

  _handleRateButtonDidPress(){
    this._openRatesModal();
  }

  _handleExchangeButtonAction(){

  }
  // #section-end Interactions

  // #section-begin slides
  _topSlideExchangeAmountDidChange(amount, currencyData){
    console.log('did change', amount);
  }

  _renderTopCarouselSlide(currencyData){
    let slider = 
      <TopCurrencyCarouselSlide 
        currencyData={ currencyData }
        exchangeAmountDidChange={
          (amount, currencyData)=>this._topSlideExchangeAmountDidChange(amount, currencyData)
        }
      />;
    return slider;
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
      windowWidth,
      windowHeight
    } = this.props;

    const {
      isRateModalOpen
    } = this.state;

    let componentToRender;
    if(this.state.windowWidth <= 768){

    }

    let topSlides = [
      this._renderTopCarouselSlide(Currencies[48]),
      this._renderTopCarouselSlide(Currencies[4]),
      this._renderTopCarouselSlide(Currencies[13])
    ];

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
            cancelButtonDidPress={()=>{}}
            rateButtonDidPress={()=>this._handleRateButtonDidPress()}
            exchangeButtonDidPress={()=>{}}
          />
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

ExchangeScreen.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    currencyRate: state.currencyRate
  };
}

export default connect(
  mapStateToProps
)(ExchangeScreen);