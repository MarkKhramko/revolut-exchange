import React, { Component } from "react";
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';
import RateButton from './RateButton';

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
      shouldHideCancelButton,

      didPressCancelButton,
      didPressRateButton,
      didPressExchangeButton,
      
      exchangeRate,
      convertableCurrencyData,
      receivableCurrencyData
    } = this.props;


    let cancelButton;
    if(!shouldHideCancelButton){
      cancelButton = 
          <FlatButton 
            label="Cancel"
            onTouchTap={ didPressCancelButton }
            hoverColor="#0D55A5"
            labelStyle={ styles.buttonLabel }
            style={styles.button}
          />
    }
    else{
      // Dummy left placeholder
      cancelButton = <div style={{width: 88}}></div>
    }

    return (
      <div style={ styles.componentContainer }>
        <div style={ styles.buttonsContainer }>
          {cancelButton}
          <RateButton
            buttonDidPress={didPressRateButton}
            exchangeRate={exchangeRate}
            convertableCurrencyData={convertableCurrencyData}
            receivableCurrencyData={receivableCurrencyData}
          />
          <FlatButton
            label="Exchange"
            onTouchTap={ didPressExchangeButton }
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

  // Should left top cancel button be hidden.
  // It is true in mobile layout.
  shouldHideCancelButton: PropTypes.bool.isRequired,

  didPressCancelButton: PropTypes.func.isRequired,
  didPressRateButton: PropTypes.func.isRequired,
  didPressExchangeButton: PropTypes.func.isRequired,

  // How much user will recieve, if they exchange currencies.
  exchangeRate: PropTypes.number.isRequired,
  // Currency data, that User wants to exhange.
  convertableCurrencyData: PropTypes.object.isRequired,
  // Currency data, that User wants to recieve.
  receivableCurrencyData: PropTypes.object.isRequired
};

TopBar.BAR_HEIGHT = styles.componentContainer.height + 4;