import React, { Component } from "react";
import PropTypes from 'prop-types';

import BackgroundBubbles from '../BackgroundBubbles';
import ExchangeButton from './ExchangeButton';

const styles = {
  componentContainer:{
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    padding: 5,
    zIndex: 100,
    
    display: '-webkit-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class TopBar extends Component {
  render() {
    const { 
      didPressExchangeButton 
    } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <BackgroundBubbles
          // By default BackgroundBubbles are programmed to fit height of component,
          // but this bar has width bigger, that height,
          // so we should do the opposite.
          shouldFitWidth={ true }
        />
        <ExchangeButton
          onTouchTap={ didPressExchangeButton }
        />
      </div>
    );
  }
}

TopBar.propTypes = {
  didPressExchangeButton: PropTypes.func.isRequired
};

// Height of component container
TopBar.HEIGHT = styles.componentContainer.height;