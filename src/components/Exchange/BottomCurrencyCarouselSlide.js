import React, { Component } from "react";
import PropTypes from 'prop-types';

const styles = {
  componentContainer:{
    padding: '9vw',
    paddingTop: 35,
    paddingBottom: 35,
    height: '100%'
  },

  rowContainer:{
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },

  leftBlock: {
    float: 'left',
    width: '60%',
    textAlign: 'left'
  },

  rightBlock:{
    float: 'right',
    width: '40%',
    textAlign: 'right'
  },

  currencyCode:{
    float: 'left',
    width: '100%',
    fontSize: 28,
    padding: 2,
    color: 'white'
  },

  yourAmountHeader:{
    float: 'left',
    width: '100%',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.32)'
  },

  numericInput:{
    float: 'right',
    textAlign: 'right',
    width: '100%',
    padding: 2,
    color: 'white',
    fontSize: 28,
    letterSpacing: '0.04em',
    border: 0,
    outline: 'none',
    backgroundColor:'transparent'
  }
}

export default class BottomCurrencyCarouselSlide extends Component {

  constructor(props){
    super(props);

    this.state = {
      amountInputValue: ""
    }
  }

  _handleTopRowClick(){
    this.amountInput.focus();
  }

  // #section-begin input validation
  _validateInput(value){

    // Accept only strings that have 
    // <numbers> <dot or comma> <numbers>
    let pattern = /^[0-9]*([,.][0-9]*)?$/;
    
    return pattern.test(value);
  }
  // #section-end input validation

  _handleAmountInputValueChange(newValue){

    // Becouse we always have minus in front of the number,
    // we should remove it to validate value
    let valueWithoutMinus = newValue.replace(/-/g, "");

    // If string without minus is empty, set empty string
    if(valueWithoutMinus.length < 1){
      let amountInputValue = "";
      this.setState({ amountInputValue });
      this._notifyAboutExchangeAmountChange("0");
      return;
    }
    
    // If string passed validation, set it with minus in front
    if(this._validateInput(valueWithoutMinus)){
      let amountInputValue = "-" + valueWithoutMinus;
      this.setState({ amountInputValue });
      this._notifyAboutExchangeAmountChange(valueWithoutMinus);
    }
  }

  _notifyAboutExchangeAmountChange(amountInputvalue){

    const {
      exchangeAmountDidChange,
      currencyData 
    } = this.props;

    // Replace all commas to dots and convert string to number
    let amount = Number(amountInputvalue.replace(/,/g, "."));
    exchangeAmountDidChange(amount, currencyData);
  }

  render() {
    const {
      currencyData
    } = this.props;

    const {
      amountInputValue
    } = this.state;

    return (
      <div style={ styles.componentContainer }>
        <div 
          onTouchTap={()=>this._handleTopRowClick()}
          style={ styles.rowContainer }>
          <div style={ styles.leftBlock }>
            <div style={ styles.currencyCode }>
              { currencyData.Code }
            </div>
            <div style={ styles.yourAmountHeader }>
              You have $1056.4
            </div>
          </div>
          <div style={ styles.rightBlock }>
            <input 
              ref={(input) => { this.amountInput = input }}
              type="text"
              value={ amountInputValue }
              onChange={ (event)=>this._handleAmountInputValueChange(event.target.value) }
              style={ styles.numericInput }
            />
          </div>
        </div>
      </div>
    );
  }
}

BottomCurrencyCarouselSlide.propTypes = {
  currencyData: PropTypes.object.isRequired
};
