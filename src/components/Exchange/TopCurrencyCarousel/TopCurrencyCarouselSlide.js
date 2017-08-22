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

  userAmountText:{
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

    // References, that will be set after first render call
    this.amountInput;
  }

  // #section-begin Public methods
  /**
   * Focus on exchange amount input.
   */
  focusInput(){
    this.amountInput.focus();
  }

  /**
   * Returns amount, that user wants to exchange.
   * @returns {number} value of exchange amount input
   */
  getExchangeAmount(){

    const{amountInputValue} = this.state;

    // Because we always have minus in front of the number string value,
    // we should remove it to procceed with number
    let valueWithoutMinus = amountInputValue.replace(/-/g, "");

    // Replace all commas to dots and convert string to number
    let amount = Number(valueWithoutMinus.replace(/,/g, "."));

    return amount;
  }

  /**
   * Returns currency data object, that was passed in props.
   * @returns {Object} currency data object, that was passed in props.
   */
  getCurrencyData(){
    const{
      currencyData
    } = this.props;
    return currencyData;
  }
  // #section-end Public methods

  // #section-begin Input Validation
  /**
   * Checks if string is accepted by regex pattern.
   * @param {String} value - String to test
   * @returns {bool} Result of validation.
   */
  _validateInput(value){

    // Accept only strings, which are like 
    // <digits><dot or comma><up to 2 digits>
    let pattern = /^[0-9]*([,.][0-9]{0,2})?$/;
    
    return pattern.test(value);
  }
  // #section-end Input Validation

  // #section-begin Interactions
  /**
   * Top row is an area, that holds currency code and exchange input,
   * if user clicked or tapped in this area, focus on input.
   */
  _handleTopRowClick(){
    this.amountInput.focus();
  }

  /**
   * Validates string from exchange amount input and saves it in state.
   * @param {String} newValue - Value from exchange amount input, that should be validated and saved.
   */
  _handleAmountInputValueChange(newValue){

    // Becouse we always have minus in front of the number,
    // we should remove it to validate value
    let valueWithoutMinus = newValue.replace(/-/g, "");

    // If string without minus is empty, set empty string.
    if(valueWithoutMinus.length < 1){
      let amountInputValue = "";
      this.setState({ amountInputValue });
    }
    // If string passed validation, save it in state with minus in front.
    else if(this._validateInput(valueWithoutMinus)){
      let amountInputValue = "-" + valueWithoutMinus;
      this.setState({ amountInputValue });
    }
    this._notifyAboutExchangeAmountChange(valueWithoutMinus);
  }
  // #section-end Interactions

  _fitFontSizeInAmountInput(amountLength, windowWidth){
  }

  /**
   * Notifies parent component about change in User's exchange amount.
   * @param {String} amountInputvalue - Value from exchange amount input.
   */
  _notifyAboutExchangeAmountChange(amountInputvalue){

    const{
      exchangeAmountDidChange,
      currencyData 
    } = this.props;

    // Replace all commas to dots and convert string to number.
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
            <div style={ styles.userAmountText }>
              {'You have ' + currencyData.Symbol + currencyAmount.toFixed(2)}
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

  exchangeAmountDidChange: PropTypes.func.isRequired
};
