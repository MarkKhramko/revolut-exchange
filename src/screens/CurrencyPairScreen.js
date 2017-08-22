import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CurrencyPairActions from '../actions/currencyPairActions';

import {Currencies} from '../constants/Currencies';

import BackgroundBubbles from '../components/BackgroundBubbles';
import TopBar from '../components/CurrencyPair/TopBar';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  screenContainer:{
    height: '100vh',
    overflow: 'hidden'
  },

  listContainer:{
    width: '100%',
    minHeight: '100vh',
    maxHeight: '100%',
    overflow: 'scroll'
  },

  listItem:{
    color:'white',
    textAlign: 'left',
    letterSpacing: '0.02em',
    borderBottom: 'solid',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },

  labelStyle:{
    color: 'white'
  },

  iconStyle:{
    fill: 'white'
  }
}

class CurrencyPairScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      // Array that holds bools for every currency. It will be filled with 'false' by default.
      checkedCurrencies:this._getDefaultCheckedCurrenciesArray(),
      // How many currencies User has selected already.
      selectedCurrenciesCount: 0
    }
  }

  /**
   * Returns array with size of all currencies, where each value is false
   * @returns {Array}
   */
  _getDefaultCheckedCurrenciesArray(){
    let checkedCurrencies = [];
    Currencies.forEach((currency)=>{
      checkedCurrencies.push(false);
    });
    return checkedCurrencies;
  }

  // #section-begin Navigation
  /**
   * Remove current screen from navigation stack with modal transition.
   */
  _dismissThisScreen(){
    const{ 
      navigationStackController 
    }=this.props;
    navigationStackController.popModal();
  }
  // #section-end Navigation

  // #section-begin Interactions
  /**
   * Saves selected pair to global state. And goes back to previous screen.
   * @param {Array} checkedCurrencies - Array of all currencies checked and not.
   */
  _didChooseCurrencyPair(checkedCurrencies){
    const{
      currencyPairActions
    }=this.props;

    let pair = [];
    checkedCurrencies.forEach((currencyCheck, index)=>{
      if(currencyCheck == true){
        pair.push(Currencies[index]);
      }
    });

    // Save selected pair to global state.
    currencyPairActions.addPair(pair[0], pair[1]);
    // Go back to previous screen
    this._dismissThisScreen();
  }

  /**
   * Saves checked currency. 
   * If pair was selected, procceeds with notification algorythm.
   * @param {number} index - index of checked currency
   */
  _handleListClick(index){
    let{ 
      checkedCurrencies, 
      selectedCurrenciesCount 
    } = this.state;

    // Check currency
    checkedCurrencies[index] = true;
    // Increase amount of checked currencies
    selectedCurrenciesCount += 1;

    this.setState({ 
      checkedCurrencies, 
      selectedCurrenciesCount 
    });

    // If pair was selected
    if(selectedCurrenciesCount > 1){
      this._didChooseCurrencyPair(checkedCurrencies);
    }
  }
  // #section-end Interactions

  /**
   * Creates array of ListItem and fills each item with currency information.
   * @returns {Array} ListItems array.
   */
  _renderCurrenciesArray(){
    const{
      checkedCurrencies
    } = this.state;

    let resultArray = [];
    Currencies.forEach((currency, index)=>{
      let text = currency.Code + ' - ' + currency.Description;
      resultArray.push(
        <ListItem 
          key={currency.Code} 
          primaryTogglesNestedList={true}
          onClick={()=>this._handleListClick(index)}
          primaryText={text}
          leftCheckbox={
            <Checkbox 
              checked={checkedCurrencies[index]}
              labelStyle={ styles.labelStyle }
              iconStyle={ styles.iconStyle }
            />
          }
          disabled={ checkedCurrencies[index] }
          innerDivStyle={ styles.listItem }
          hoverColor='rgba(255, 255, 255, 0.15)'
        />
      )
    });
    return resultArray;
  }

  render() {

    const{
      selectedCurrenciesCount
    }=this.state;

    const{
      screenWidth
    }=this.props;

    // If User didn't selected any currency, 
    // present him with option 1,
    // otherwise with option 2
    let topBarTitle = selectedCurrenciesCount < 1 ? 
      "Select Currency 1" :
      "Select Currency 2";

    let screenContainerStyle = {
      ...styles.screenContainer,
      width: screenWidth
    }
    return (
      <div style={ screenContainerStyle }>
        <BackgroundBubbles />
        <TopBar
          title={ topBarTitle }
        />
        <div style={ styles.listContainer }>
          <List>
            {this._renderCurrenciesArray()}
          </List>
        </div>
      </div>
    );
  }
}

CurrencyPairScreen.propTypes = {
  screenWidth: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currencyPairActions: bindActionCreators(CurrencyPairActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyPairScreen);
