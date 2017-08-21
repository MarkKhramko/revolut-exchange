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
      cancelButtonDidPress,
      rateButtonDidPress,
      exchangeButtonDidPress,
      exchangeRate,
      convertableCurrencyData,
      receivableCurrencyData
    } = this.props;


    let cancelButton;
    if(!shouldHideCancelButton){
      cancelButton = 
          <FlatButton 
            label="Cancel"
            onTouchTap={ cancelButtonDidPress }
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
            buttonDidPress={rateButtonDidPress}
            exchangeRate={exchangeRate}
            convertableCurrencyData={convertableCurrencyData}
            receivableCurrencyData={receivableCurrencyData}
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
  shouldHideCancelButton: PropTypes.bool.isRequired,
  cancelButtonDidPress: PropTypes.func.isRequired,
  rateButtonDidPress: PropTypes.func.isRequired,
  exchangeButtonDidPress: PropTypes.func.isRequired,
  exchangeRate: PropTypes.number.isRequired,
  convertableCurrencyData: PropTypes.object.isRequired,
  receivableCurrencyData: PropTypes.object.isRequired
};

TopBar.BAR_HEIGHT = styles.componentContainer.height + 4;