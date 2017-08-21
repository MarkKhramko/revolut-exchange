import React, { Component } from "react";
import PropTypes from 'prop-types';

import Moment from 'moment';

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconAutorenew from 'material-ui/svg-icons/action/autorenew';

const styles = {

  splitTextContainer:{
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between'
  },

  primaryTextLeftBlock:{
    fontSize: 12,
    paddingTop: 3
  },

  primaryTextRightBlock:{
    fontSize: 15
  },

  secondaryTextLeftBlock:{
    fontSize: 11
  },

  secondaryTextRightBlock:{
    fontSize: 11,
    color: '#009CE6'
  }
}

export default class TransactionListItem extends Component {

  _formatDate(date){
    return Moment(date).format('MMM Do YYYY, h:mma');
  }

  render() {

    const{
      transaction
    } = this.props;

    console.log(transaction);

    let transactionText = 
      "Exchanged from " + 
      transaction.from.Code +
      " to " + 
      transaction.to.Code;

    let reducedAmountText = 
      "- " + 
      transaction.from.Symbol +
      transaction.reducedAmount

    let timestampText = this._formatDate(transaction.timestamp);

    let receivedAmountText = 
      "+ " + 
      transaction.to.Symbol +
      transaction.receivedAmount.toFixed(2);

    let primaryTextComponent = 
      <div style={styles.splitTextContainer}>
        <div style={ styles.primaryTextLeftBlock }>
          {transactionText}
        </div>
        <div style={ styles.primaryTextRightBlock }>
          {reducedAmountText}
        </div>
      </div>;

    let secondaryTextComponent = 
      <div style={styles.splitTextContainer}>
        <div style={ styles.secondaryTextLeftBlock }>
          {timestampText}
        </div>
        <div style={ styles.secondaryTextRightBlock }>
          {receivedAmountText}
        </div>
      </div>;

    return (
        <ListItem
            leftAvatar={<Avatar icon={<IconAutorenew />} />}
            primaryText={primaryTextComponent}
            secondaryText={secondaryTextComponent}
        />
    );
  }
}

TransactionListItem.propTypes = {
  transaction: PropTypes.object.isRequired
};
