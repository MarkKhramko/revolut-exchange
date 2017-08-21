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
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class TopBar extends Component {
  render() {
    const { exchangeButtonDidPress } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <BackgroundBubbles
          shouldFitWidth={ true }
        />
        <ExchangeButton
          onTouchTap={ exchangeButtonDidPress }
        />
      </div>
    );
  }
}

TopBar.propTypes = {
  exchangeButtonDidPress: PropTypes.func.isRequired
};

TopBar.HEIGHT = styles.componentContainer.height;