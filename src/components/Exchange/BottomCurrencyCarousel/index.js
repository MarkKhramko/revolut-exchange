import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

import BottomCurrencyCarouselSlide from './BottomCurrencyCarouselSlide';

const carouselSettings = {
    dots: true, // Should show pagination.
    arrows: true, // Should show left and right arrow.
    infinite: false, // Carousel should not be looped.
    speed: 350, // Speed of slides switch animation in ms.
    slidesToShow: 1 // How much slides should be visible.
};

export default class BottomCurrencyCarousel extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentSlideIndex: 0,
      currentCurrencyData: props.slidesData[0].currencyData,
    }
    // References, that will be set after first render call.
    // slidesRefs { Array } holds references to all child slides.
    this.slidesRefs;
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

  /**
   * Method is called after user changes slide.
   * @param {number} slideIndex - Current slide index. Index, that was passed, by carousel.
   */
  _handleSliderAfterChange(slideIndex){
    const {
      slidesData
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

    let currentSlideIndex = slideIndex;
    let currentCurrencyData = slide.getCurrencyData();
    this.setState({ currentSlideIndex, currentCurrencyData })
  }

  /**
   * Creates and returns BottomCurrencyCarouselSlide Array.
   * @param {Array} slidesData - Holds parameters for each slide.
   * @param {(number|String)} slideHeight - Height of carousel slide.
   * @returns {Array} Rendered BottomCurrencyCarouselSlide slides.
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
      let receivedAmount = slideData.receivedAmount;

      slides.push(
        <div 
          key={index}
          style={{
            height:slideHeight
          }}>
          <BottomCurrencyCarouselSlide
            // Save reference to this slide
            ref={(ref)=>this.slidesRefs.push(ref)}
            currencyData={ currencyData }
            currencyAmount={ currencyAmount }
            receivedAmount={ receivedAmount }
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

BottomCurrencyCarousel.propTypes = {
  slideHeight: PropTypes.string.isRequired,
  slidesData: PropTypes.array.isRequired
};