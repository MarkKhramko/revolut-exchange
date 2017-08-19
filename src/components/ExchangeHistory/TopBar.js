import React, { Component } from "react";
import PropTypes from 'prop-types';

import BackgroundBubbles from '../BackgroundBubbles';
import ExchangeButton from './ExchangeButton';

const styles = {
  componentContainer:{
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    padding: 5,
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class TopBar extends Component {

  _handleExchangeButtonAction(){
  }

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
