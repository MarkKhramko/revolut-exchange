import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Currencies} from '../constants/Currencies';

import BackgroundBubbles from '../components/BackgroundBubbles';
import {List, ListItem} from 'material-ui/List';


const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  listContainer:{
    marginTop: 60,
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
  }
}

class ExchangeRatesScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      enabledCurrencies:this._initEnabledCurrencies()
    }
  }

  _initEnabledCurrencies(){
    let enabledCurrencies = [];
    Currencies.forEach((currency)=>{
      enabledCurrencies.push(true);
    });
    return enabledCurrencies;
  }

  _handleListClick(currency, index){
    let { enabledCurrencies } = this.state;
    enabledCurrencies[index] = false;
    this.setState({ enabledCurrencies });

    console.log(enabledCurrencies);

    const { didChooseCurrency } = this.props;
    if(didChooseCurrency){
      didChooseCurrency(currency);
    }
  }

  _renderCurrenciesArray(){
    const{
      enabledCurrencies
    } = this.state;

    let resultArray = [];
    Currencies.forEach((currency, index)=>{
      let text = currency.Code + ' - ' + currency.Description;
      resultArray.push(
        <ListItem 
          key={currency.Code} 
          primaryText={text}
          innerDivStyle={ styles.listItem }
          hoverColor='rgba(255, 255, 255, 0.15)'
          disabled={!enabledCurrencies[index]}
          onClick={()=>this._handleListClick(currency, index)}
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

ExchangeRatesScreen.propTypes = {
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
)(ExchangeRatesScreen);
