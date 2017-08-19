import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CurrencyRateActions from './actions/currencyRate';
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
    const timeInterval = 1000; // 10 seconds

    this.timer = setInterval(
      ()=>this._fetchExchangeRate(),
      timeInterval
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _fetchExchangeRate(){
    const { currencyRateActions } = this.props;
    currencyRateActions.setTimestamp(Math.random());
    currencyRateActions.setRates([Math.random()]);
  }

  // #section-begin Networking
  _fetchCurrencyRates(){

    let url = APIConstants.USD_BASED_JSON_URL;
    fetch(url, {
      'Content-Type': 'application/json'
    })
    .then((response) => response.json())
    .then(response => {
      console.log(response.rates);
    })
    .catch((err) => {
        console.log('Fetch error', err)
    })
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
