import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Currencies} from '../constants/Currencies';

import BackgroundBubbles from '../components/BackgroundBubbles';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  listContainer:{
    marginTop: 65,
    height: '100%',
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
      checkedCurrencies:this._initCheckedCurrencies()
    }
  }

  _initCheckedCurrencies(){
    let checkedCurrencies = [];
    Currencies.forEach((currency)=>{
      checkedCurrencies.push(false);
    });
    return checkedCurrencies;
  }

  _handleListClick(currency, index){

    console.log(currency);

    let { checkedCurrencies } = this.state;
    checkedCurrencies[index] = true;
    this.setState({ checkedCurrencies });

    console.log(checkedCurrencies);

    const { didChooseCurrency } = this.props;
    if(didChooseCurrency){
      didChooseCurrency(currency);
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

    return (
      <div style={ styles.screenContainer }>
        <BackgroundBubbles />
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
  didChooseCurrency: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyPairScreen);
