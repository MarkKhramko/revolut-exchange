import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

import TopCurrencyCarouselSlide from './TopCurrencyCarouselSlide';

const carouselSettings = {
    dots: true, // Should show pagination.
    arrows: true, // Should show left and right arrow.
    infinite: false, // Carousel should not be looped.
    speed: 350, // Speed of slides switch animation in ms.
    slidesToShow: 1 // How much slides should be visible.
};

export default class TopCurrencyCarousel extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentSlideIndex: 0,
      currentCurrencyData: props.slidesData[0].currencyData,
      currentExchangeAmount: 0
    }

    // References, that will be set after first render call.
    // slidesRefs { Array } holds references to all child slides.
    this.slidesRefs;
  }


  componentDidMount() {
    // After carousel was added to the DOM,
    // focus on current slide input.
    let firstSlide = this.slidesRefs[0];
    firstSlide.focusInput();
  }

  // #section-begin Public methods
  /**
   * Returns amount of currency, that user wants to exchange.
   * @returns {number} amount of currency, that user wants to exchange.
   */
  getExchangeAmount(){
    const{ 
      currentExchangeAmount 
    } = this.state;
    return currentExchangeAmount;
  }

  /**
   * Returns currency data object from current slide.
   * @returns {Object} currency data object from current slide.
   */
  getCurrencyData(){
    const{
      currentCurrencyData
    } = this.state;
    return currentCurrencyData;
  }
  // #section-end Public methods

  /**
   * Saves state of how much user wants to exchange and which currency.
   * Also notifies parent component about changes.
   * @param {number} amount - How much user wants to exchange.
   * @param {Object} currencyData - Current selected currency.
   */
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

    // Notify parent object, about changes in currency and exchange amount.
    exchangeAmountDidChange(currencyData, amount);
  }

  /**
   * Method is called after user changes slide.
   * @param {number} slideIndex - Current slide index. Index, that was passed, by carousel.
   */
  _handleSliderAfterChange(slideIndex){
    const {
      slidesData,
      slideDidChange
    } = this.props;

    let refIndex;
    // During the work of carousel, 
    // there could be left number of empty slides,
    // we dont want them, so we move our index by slides count positions.
    if(this.slidesRefs.length > slidesData.length){
      refIndex = slideIndex + slidesData.length;
    }
    // If we did not detect any empty slides,
    // procceed with index itself.
    else{
      refIndex = slideIndex;
    }

    // Extract reference to slide from references array.
    let slide = this.slidesRefs[refIndex];

    // After slide has been selected, focus on input inside
    slide.focusInput();

    let currentSlideIndex = slideIndex;
    let currentCurrencyData = slide.getCurrencyData();
    let currentExchangeAmount = slide.getExchangeAmount();
    this.setState({ currentSlideIndex, currentCurrencyData, currentExchangeAmount });

    // Notify parent object, about changes in currency and exchange amount.
    slideDidChange(currentCurrencyData, currentExchangeAmount)
  }

  /**
   * Creates and returns TopCurrencyCarouselSlide Array.
   * @param {Array} slidesData - Holds parameters for each slide.
   * @param {(number|String)} slideHeight - Height of carousel slide.
   * @returns {Array} Rendered TopCurrencyCarouselSlide slides.
   */
  _renderSlides(slidesData, slideHeight){

    // slidesRefs { Array } holds references to all child slides.
    // Empty slidesRefs array after every render, 
    // so it can be filled with new slides references.
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
            // Save reference to this slide
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