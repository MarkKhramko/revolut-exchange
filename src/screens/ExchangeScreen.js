import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CurrencyRateActions from '../actions/currencyRate';
import * as APIConstants from '../constants/ECBAPI';

import BackgroundBubbles from '../components/BackgroundBubbles';
import TopBar from '../components/Exchange/TopBar';
import DarkenedArea from '../components/Exchange/DarkenedArea';
import CurrencyCarousel from '../components/Exchange/CurrencyCarousel';
import CurrencyCarouselSlide from '../components/Exchange/CurrencyCarouselSlide';

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

  backgroundImageContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
    width: '100%',
    height: '50%',
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

  _renderCarouselSlide(){
    let slider = <CurrencyCarouselSlide />;
    return slider;
  }

  render() {

    const {
      windowWidth,
      windowHeight
    } = this.props;

    const {
      isRateModalOpen
    } = this.state;

    // console.log(this.props.currencyRate);

    let componentToRender;
    if(this.state.windowWidth <= 768){

    }

    let slides = [
      this._renderCarouselSlide(),
      this._renderCarouselSlide()
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
        <div style={ styles.topCarouselContainer }>
          <CurrencyCarousel slides={slides} />
        </div>
        <div style={ styles.darkenedAreaContainer }>
          <DarkenedArea 
            width={windowWidth}
            height={windowHeight/2}
          />
        </div>

        <FullscreenDialog
          open={isRateModalOpen}
          title="Select Currency 1"
          appBarStyle={ styles.dialogTopBar }
          immersive={true}
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

function mapDispatchToProps(dispatch) {
  return {
    currencyRateActions: bindActionCreators(CurrencyRateActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeScreen);