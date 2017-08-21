import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

import BottomCurrencyCarouselSlide from './BottomCurrencyCarouselSlide';

const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 350,
    vertical: false,
    slidesToShow: 1
};

export default class BottomCurrencyCarousel extends Component {

  constructor(props){
    super(props);

    this.state = {
      currentSlideIndex: 0,
      currentCurrencyData: props.slidesData[0].currencyData,
    }
    // References, that will be set after first render call
    this.slidesRefs;
  }

  getCurrencyData(){
    const{
      currentCurrencyData
    } = this.state;
    return currentCurrencyData;
  }

  _handleSliderAfterChange(slideIndex){
    const {
      slidesData
    } = this.props;

    let refIndex;
    if(this.slidesRefs.length > slidesData.length){
      refIndex = slideIndex + slidesData.length;
    }
    else{
      refIndex = slideIndex;
    }
    let slide = this.slidesRefs[refIndex];

    let currentSlideIndex = slideIndex;
    let currentCurrencyData = slide.getCurrencyData();
    this.setState({ currentSlideIndex, currentCurrencyData })
  }

  _renderSlides(slidesData, slideHeight){

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