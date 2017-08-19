import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 350,
    vertical: false,
    slidesToShow: 1
};

export default class CurrencyCarousel extends Component {

  render() {
    const {
      slides,
      slideHeight
    } = this.props;

    return (
      <Slider 
        {...carouselSettings}
      >
        { slides.map((slide, index) =>{
          return(
            <div 
              key={index}
              style={{
                height:slideHeight
              }}
            >
              {slide}
            </div>
        )})
      }
      </Slider>
    );
  }
}

CurrencyCarousel.propTypes = {
  slideHeight: PropTypes.string.isRequired,
  slides: PropTypes.array.isRequired,
  slideDidChange: PropTypes.func.isRequired
};