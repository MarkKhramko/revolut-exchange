import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Slider from 'react-slick'

const styles = {

  carouselSlide:{
    height: '24vh'
  }
}

const carouselSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    vertical: false,
    slidesToShow: 1
};

class CurrencyCarousel extends Component {

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
  slides: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyCarousel);
