import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

import TopCurrencyCarouselSlide from './TopCurrencyCarouselSlide';

const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 350,
    vertical: false,
    slidesToShow: 1
};

export default class TopCurrencyCarousel extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentSlideIndex: 0,
      currentCurrencyData: props.slidesData[0].currencyData,
      currentExchangeAmount: 0
    }
    // References, that will be set after first render call
    this.slidesRefs;
  }

  componentDidMount() {
    let firstSlide = this.slidesRefs[0];
    firstSlide.focusInput();
  }

  // #section-begin Public methods
  getExchangeAmount(){
    const{ currentExchangeAmount } = this.state;
    return currentExchangeAmount;
  }

  getCurrencyData(){
    const{
      currentCurrencyData
    } = this.state;
    return currentCurrencyData;
  }
  // #section-end Public methods

  _slideExchangeAmountDidChange(amount, currencyData){
    const{
      exchangeAmountDidChange
    } = this.props;

    let currentCurrencyData = currencyData;
    let currentExchangeAmount = amount;
    this.setState({
      currentCurrencyData,
      currentExchangeAmount
    });

    exchangeAmountDidChange(currencyData, amount);
  }

  _handleSliderAfterChange(slideIndex){
    const {
      slidesData,
      slideDidChange
    } = this.props;

    let refIndex;
    if(this.slidesRefs.length > slidesData.length){
      refIndex = slideIndex + slidesData.length;
    }
    else{
      refIndex = slideIndex;
    }
    let slide = this.slidesRefs[refIndex];
    // After slide has been selected, focus on input inside
    slide.focusInput();

    let currentSlideIndex = slideIndex;
    let currentCurrencyData = slide.getCurrencyData();
    let currentExchangeAmount = slide.getExchangeAmount();
    this.setState({ currentSlideIndex, currentCurrencyData, currentExchangeAmount });

    slideDidChange(currentCurrencyData, currentExchangeAmount)
  }

  _renderSlides(slidesData, slideHeight){
    this.slidesRefs = [];

    let slides = [];
    slidesData.map((slideData, index) =>{
      let currencyData = slideData.currencyData;
      let currencyAmount = slideData.currencyAmount;

      slides.push(
        <div 
          key={index}
          style={{
            height:slideHeight
          }}>
          <TopCurrencyCarouselSlide
            ref={(ref)=>this.slidesRefs.push(ref)}
            currencyData={ currencyData }
            currencyAmount={ currencyAmount }
            exchangeAmountDidChange={
              (amount, currencyData)=>this._slideExchangeAmountDidChange(amount, currencyData)
            }
          />
        </div>
    )})
    return slides;
  }

  render() {
    const {
      slideHeight,
      slidesData
    } = this.props;

    return (
      <Slider 
        {...carouselSettings}
        afterChange={(index)=>this._handleSliderAfterChange(index)}
      >
        {this._renderSlides(slidesData, slideHeight)}
      </Slider>
    );
  }
}

TopCurrencyCarousel.propTypes = {
  slideHeight: PropTypes.string.isRequired,
  slidesData: PropTypes.array.isRequired,
  exchangeAmountDidChange: PropTypes.func.isRequired,
  slideDidChange: PropTypes.func.isRequired
};