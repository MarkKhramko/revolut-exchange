import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

const styles = {

  carouselSlide:{
    height: '25.5vh'
  }
}

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
      slides
    } = this.props;

    return (
      <Slider 
        {...carouselSettings}
      >
        { slides.map((slide, index) =>{
          return(
            <div 
              key={index}
              style={styles.carouselSlide}
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
  slideHeight: PropTypes.number.isRequired,
  slides: PropTypes.array.isRequired
};