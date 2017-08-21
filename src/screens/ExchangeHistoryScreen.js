import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {List} from 'material-ui/List';

import TopBar from '../components/ExchangeHistory/TopBar';
import TransactionListItem from '../components/ExchangeHistory/TransactionListItem';
import ExchangeScreen from './ExchangeScreen';

const styles = {
  screenContainer:{
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },

  listContainer:{
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  }
}

class ExchangeHistoryScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
    }
  }

  _exchangeButtonDidPress(){
    const{ navigationController }=this.props;
    navigationController.pushView(<ExchangeScreen/>)
  }

  _renderListItems(transactions){

    let listItems = [];
    transactions.forEach((transaction, index)=>{

      listItems.push(
          <TransactionListItem 
            key={ index }
            transaction={ transaction }
          />
      );
    })

    return listItems;
  }

  render() {

    const {
      shouldShowTopBar,
      exchangeButtonDidPress,
      exchangeHistory
    } = this.props;

    let topBar = <div></div>;
    if(shouldShowTopBar){
      topBar = <TopBar exchangeButtonDidPress={()=>this._exchangeButtonDidPress()}/>
    }

    return (
      <div style={ styles.screenContainer }>
        {topBar}
        <div style={ styles.listContainer }>
          <List>
            {this._renderListItems(exchangeHistory.transactions)}
          </List>
        </div>
      </div>
    );
  }
}

ExchangeHistoryScreen.propTypes = {
  shouldShowTopBar: PropTypes.bool
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
