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
    left: 0
  }
}

export default class BackgroundBubbles extends Component {

  render() {
    const {
      shouldFitWidth
    } = this.props;

    let blurBubblesStyle = {
      ...styles.blurBubbles,
      height: shouldFitWidth ? 'auto' : '100%',
      width: shouldFitWidth ? '100%' : 'auto',
    }

    console.log(blurBubblesStyle);

    return (
      <div style={ styles.componentContainer }>
        <img 
          src={require('../static/blue-gradient.png')}
          style={ styles.backgroundImage }
        />
        <img 
          src={require('../static/blur-bubbles.png')}
          style={ blurBubblesStyle }
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
