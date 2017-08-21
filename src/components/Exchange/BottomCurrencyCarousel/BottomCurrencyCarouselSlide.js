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

  currencyAmountText:{
    float: 'right',
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
  }
}

export default class BottomCurrencyCarouselSlide extends Component {

  constructor(props){
    super(props);

    this.state = {
    }
  }

  // #section-begin Public methods
  focusInput(){
    this.amountInput.focus();
  }

  getExchangeAmount(){
    const{amountInputValue} = this.state;
    return amountInputValue;
  }

  getCurrencyData(){
    const{
      currencyData
    } = this.props;
    return currencyData;
  }
  // #section-end Public methods

  render() {
    const {
      currencyData,
      currencyAmount,
      receivedAmount
    } = this.props;

    let receivedAmountText;
    if(receivedAmount > 0){
      receivedAmountText = '+' + receivedAmount.toFixed(2);
    }
    else{
      receivedAmountText = "";
    }

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
            <div style={ styles.currencyAmountText }>
              {receivedAmountText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BottomCurrencyCarouselSlide.propTypes = {
  currencyData: PropTypes.object.isRequired,
  currencyAmount: PropTypes.number.isRequired,
  receivedAmount: PropTypes.number.isRequired
};
