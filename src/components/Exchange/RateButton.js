import React, { Component } from "react";
import PropTypes from 'prop-types';
import IconArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

const styles = {

  button:{
    borderRadius: 6,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderWidth: 1.5,
    borderStyle: 'solid',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    padding: 3,
    outline: 'none'
  },

  buttonTextContainer:{
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around'
  },

  buttonText:{
    display: 'inline',
    fontSize: 12,
    padding: 5
  },

  dropDownArrow:{
    display: 'inline',
    color: 'white',
  },

  smallFont:{
    fontSize: 11
  },

  bigFont: {
    fontSize: 14
  }
}

export default class RateButton extends Component {

  render() {

    const{
      buttonDidPress,
      convertableCurrencyData,
      receivableCurrencyData
    } = this.props;

    let convertableCurrencySymbol = convertableCurrencyData.Symbol;
    let receivableCurrencySymbol = receivableCurrencyData.Symbol;

    return (
      <button
        style={styles.button}
        onTouchTap={buttonDidPress}
      >
        <div style={styles.buttonTextContainer}>
          <span style={styles.buttonText}>
            <span style={ styles.smallFont }>
              { convertableCurrencySymbol }
            </span>
            <span style={ styles.bigFont }>
              1
            </span>
            <span style={ styles.smallFont }>
             {' = '}
            </span>
            <span style={ styles.smallFont }>
              { receivableCurrencySymbol }
            </span>
            <span style={ styles.bigFont }>
              1.34
            </span>
            <span style={ styles.smallFont }>
              40
            </span>
          </span>
          <IconArrowDropDown style={ styles.dropDownArrow }/>
        </div>
      </button>
    );
  }
}

RateButton.propTypes = {
  buttonDidPress: PropTypes.func.isRequired,
  convertableCurrencyData: PropTypes.object.isRequired,
  receivableCurrencyData: PropTypes.object.isRequired
};
