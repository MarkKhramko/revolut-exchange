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
      checkedCurrencies:this._initCheckedCurrencies(),
      selectedCurrenciesCount: 0
    }
  }

  _initCheckedCurrencies(){
    let checkedCurrencies = [];
    Currencies.forEach((currency)=>{
      checkedCurrencies.push(false);
    });
    return checkedCurrencies;
  }

  // #section-begin Navigation
  _dismissThisScreen(){
    const{ navigationStackController }=this.props;
    navigationStackController.popModal();
  }
  // #section-end Navigation

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

    currencyPairActions.addPair(pair[0], pair[1]);
    
    this._dismissThisScreen();
  }

  _handleListClick(currency, index){
    let{ 
      checkedCurrencies, 
      selectedCurrenciesCount 
    } = this.state;

    checkedCurrencies[index] = true;
    selectedCurrenciesCount += 1;

    this.setState({ 
      checkedCurrencies, 
      selectedCurrenciesCount 
    });

    // If pair was selected, call back
    if(selectedCurrenciesCount > 1){
      this._didChooseCurrencyPair(checkedCurrencies);
    }
  }

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
          onClick={()=>this._handleListClick(currency, index)}
          primaryText={text}
          leftCheckbox={
            <Checkbox 
              checked={checkedCurrencies[index]}
              labelStyle={ styles.labelStyle }
              iconStyle={ styles.iconStyle }
            />
          }
          disabled={ false }
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
