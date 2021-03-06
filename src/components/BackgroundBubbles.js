import React, { Component } from "react";
import PropTypes from 'prop-types';

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },

  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },

  blurBubbles:{
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  }
}

export default class BackgroundBubbles extends Component {

  render() {
    const {
      shouldFitWidth
    } = this.props;

    // If should fit width,
    // fill width of whole window,
    // if not,
    // fill height of whole window
    let blurBubblesStyle = {
      ...styles.blurBubbles,
      height: shouldFitWidth ? 'auto' : '100vh',
      width: shouldFitWidth ? '100vw' : 'auto',
    }

    return (
      <div style={ styles.componentContainer }>
        <img 
          src={require('../static/blue-gradient.png')}
          style={ styles.backgroundImage }
          alt=""
        />
        <img 
          src={require('../static/blur-bubbles.png')}
          style={ blurBubblesStyle }
          alt=""
        />
      </div>
    );
  }
}

BackgroundBubbles.propTypes = {
  shouldFitWidth: PropTypes.bool
}

BackgroundBubbles.defaultPropTypes = {
  shouldFitWidth: false
}
