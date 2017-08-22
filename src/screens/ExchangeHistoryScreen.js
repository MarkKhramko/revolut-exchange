import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {List} from 'material-ui/List';

import TopBar from '../components/ExchangeHistory/TopBar';
import TransactionListItem from '../components/ExchangeHistory/TransactionListItem';
import ExchangeScreen from './ExchangeScreen';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = {
  screenContainer:{
    backgroundColor: 'white',
    height: '100vh',
    overflow: 'hidden'
  },

  listContainer:{
    minHeight: '100vh',
    maxHeight: '100%',
    overflow: 'scroll'
  }
}

class ExchangeHistoryScreen extends Component {

  // #section-begin Navigation
  /*
   * Transition to exchange screen.
   */
  _openExchangeScreen(){
    const{ 
      navigationStackController 
    }=this.props;

    if(navigationStackController){
      navigationStackController.push(
        <ExchangeScreen/>
      )
    }
  }
  // #section-end Navigation

  _handleExchangeButtonAction(){
    this._openExchangeScreen();
  }

  /**
   * Creates TransactionListItem array. Each item filled with transaction data.
   *
   * @param {Array} transactions - Array transactions that User performed.
   * @returns {Array}
   */
  _renderListItems(transactions){

    let listItems = [];
    transactions.forEach((transaction)=>{
      listItems.push(
        <TransactionListItem 
          key={ transaction.id }
          transaction={ transaction }
        />
      );
    })

    return listItems;
  }

  render() {

    const {
      shouldShowTopBar,
      exchangeHistory,
      screenWidth
    } = this.props;


    let topBar;
    if(shouldShowTopBar){
      topBar = 
        <TopBar 
          didPressExchangeButton={()=>this._handleExchangeButtonAction()}
        />
    }
    // If top bar should be hidden, make a dummy placeholder.
    else{
      topBar = <div></div>;
    }

    let screenContainerStyle = {
      ...styles.screenContainer,
      width: screenWidth
    }

    return (
      <div style={ screenContainerStyle }>
        {topBar}
        <div style={ styles.listContainer }>
            <List>
              <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                component="div"
              >
                {this._renderListItems(exchangeHistory.transactions)}
              </ReactCSSTransitionGroup>
            </List>
        </div>
      </div>
    );
  }
}

ExchangeHistoryScreen.propTypes = {
  shouldShowTopBar: PropTypes.bool,
  screenWidth: PropTypes.number.isRequired
};

ExchangeHistoryScreen.defaultPropTypes = {
  shouldShowTopBar: false
};

function mapStateToProps(state) {
  return {
    exchangeHistory: state.exchangeHistory
  };
}

export default connect(
  mapStateToProps
)(ExchangeHistoryScreen);
