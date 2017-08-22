import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CurrencyRateActions from './actions/currencyRateActions';
import * as APIConstants from './constants/ThirdPartyAPI';

import { MuiThemeProvider } from 'material-ui/styles';

import MainScreen from './screens/MainScreen';

const mainAppStyle = {
  body:{
    padding: 0,
    margin: 0,
    fontFamily: 'Arial'
  }
}

class App extends Component {

  componentWillMount(){
    const timeInterval = 10000; // 10 seconds

    this.timer = setInterval(
      ()=>this._fetchCurrencyRates(),
      timeInterval
    );
  }

  componentWillUnmount() {
    // Delete timer, when component will be removed from DOM.
    clearTimeout(this.timer);
  }

  // #section-begin Networking
  /**
   * Sends get request and recieves JSON object with current currency rates.
   */
  _fetchCurrencyRates(){

    let url = APIConstants.USD_BASED_JSON_URL;
    fetch(url, {
      'Content-Type': 'application/json'
    })
    // Parse response as JSON
    .then((response) => response.json())
    .then(response => {
      let rates = response.rates;
      // In case
      if(rates){
        if ("production" !== process.env.NODE_ENV){
          console.log('Received rates');
        }
        let timestamp = response.timestamp;
        this._saveCurrencyRates(rates, timestamp);
      }
      else{
        console.log('Could not receive rates');
      }
    })
    .catch((err) => {
        console.log('Fetch error', err)
    })
  }

  /**
   * Saves rates into global application state.
   * @param {Object} rates - Object with key (Code) - value (Rate) pair
   * @param {String} timestamp - Time from exchange server
   */
  _saveCurrencyRates(rates, timestamp){
    const{
      currencyRateActions
    }=this.props;
    currencyRateActions.setRates(rates, timestamp);
  }
  // #section-end Networking

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={mainAppStyle.body}>
            <MainScreen/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}


App.propTypes = {
  currencyRate: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currencyRate: state.currencyRate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currencyRateActions: bindActionCreators(CurrencyRateActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
