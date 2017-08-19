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
    letterSpacing: '0.04em',
    border: 0,
    outline: 'none',
    backgroundColor:'transparent'
  }
}

const defaultInputFontSize = styles.currencyCode.fontSize;

export default class TopCurrencyCarouselSlide extends Component {

  constructor(props){
    super(props);

    this.state = {
      amountInputValue: "",
      inputFontSize: defaultInputFontSize
    }
  }

  // #section-begin input validation
  _validateInput(value){

    // Accept only strings that have 
    // <numbers> <dot or comma> <numbers>
    let pattern = /^[0-9]*([,.][0-9]*)?$/;
    
    return pattern.test(value);
  }
  // #section-end input validation

  // #section-begin Interactions
  _handleTopRowClick(){
    this.amountInput.focus();
  }

  _handleAmountInputValueChange(newValue){

    // Becouse we always have minus in front of the number,
    // we should remove it to validate value
    let valueWithoutMinus = newValue.replace(/-/g, "");

    // If string without minus is empty, set empty string
    if(valueWithoutMinus.length < 1){
      let amountInputValue = "";
      this.setState({ amountInputValue });
    }
    // If string passed validation, set it with minus in front
    else if(this._validateInput(valueWithoutMinus)){
      let amountInputValue = "-" + valueWithoutMinus;
      this.setState({ amountInputValue });
    }
    this._notifyAboutExchangeAmountChange(valueWithoutMinus);
  }
  // #section-end Interactions

  _fitFontSizeInAmountInput(amountLength, windowWidth){

  }

  _notifyAboutExchangeAmountChange(amountInputvalue){

    const{
      exchangeAmountDidChange,
      currencyData 
    } = this.props;

    // Replace all commas to dots and convert string to number
    let amount = Number(amountInputvalue.replace(/,/g, "."));
    exchangeAmountDidChange(amount, currencyData);
  }

  render() {
    const {
      currencyData,
      currencyAmount
    } = this.props;

    const {
      amountInputValue,
      inputFontSize
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
              {'You have ' + currencyData.Symbol + currencyAmount}
            </div>
          </div>
          <div style={ styles.rightBlock }>
            <input 
              ref={(input) => { this.amountInput = input }}
              type="text"
              value={ amountInputValue }
              onChange={ (event)=>this._handleAmountInputValueChange(event.target.value) }
              style={{
                ...styles.numericInput,
                fontSize:inputFontSize
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

TopCurrencyCarouselSlide.propTypes = {
  currencyData: PropTypes.object.isRequired,
  currencyAmount: PropTypes.number.isRequired,

  exchangeAmountDidChange: PropTypes.func.isRequired,
  focusInput: PropTypes.func
};
