import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import RateButton from './RateButton';

import { Currencies } from '../../constants/Currencies';

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50
  },

  buttonsContainer:{
    paddingTop: 8,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around'
  },

  button: {
    borderRadius: 5,
    padding: 0
  },

  buttonLabel:{
    color: 'white',
    fontSize: '0.75em',
    letterSpacing: '0.05em',
    padding: 2
  }
}

export default class TopBar extends Component {

  render() {
    const { 
      cancelButtonDidPress,
      rateButtonDidPress,
      exchangeButtonDidPress 
    } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <div style={ styles.buttonsContainer }>
          <FlatButton 
            label="Cancel"
            onTouchTap={ cancelButtonDidPress }
            hoverColor="#0D55A5"
            labelStyle={ styles.buttonLabel }
            style={styles.button}
          />
          <RateButton
            buttonDidPress={rateButtonDidPress}
            convertableCurrencyData={Currencies[0]}
            receivableCurrencyData={Currencies[4]}
          />
          <FlatButton
            label="Exchange"
            onTouchTap={ exchangeButtonDidPress }
            hoverColor="#0D55A5"
            labelStyle={ styles.buttonLabel }
            style={styles.button}
          />
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  cancelButtonDidPress: PropTypes.func.isRequired,
  rateButtonDidPress: PropTypes.func.isRequired,
  exchangeButtonDidPress: PropTypes.func.isRequired
};

TopBar.BAR_HEIGHT = styles.componentContainer.height + 4;
