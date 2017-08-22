import React, { Component } from "react";
import PropTypes from 'prop-types';

import Moment from 'moment';

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconAutorenew from 'material-ui/svg-icons/action/autorenew';

const styles = {

  listItem:{
    backgroundColor: 'white'
  },

  splitTextContainer:{
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between'
  },

  primaryTextLeftBlock:{
    fontSize: 12,
    paddingTop: 2
  },

  primaryTextRightBlock:{
    fontSize: 14
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

  /**
   * Formats date to <3-letter month> <date of the month> <4-digit year>, <hours>:<minutes>
   * @param {String} date - Date with default format, that should be formatted
   * @returns {String} Formatted date
   */
  _formatDate(date){
    return Moment(date).format('MMM Do YYYY, h:mm');
  }

  render() {

    const{
      transaction
    } = this.props;

    /*
     * Transaction object holds:
     * {Object} from - Currency data, that user wants to exchange.
     * {Object} to - Currency data, that user wants to recieve.
     * {number} reducedAmount - Amount of currency, that User wants to exchange.
     * {number} receivedAmount - Amount of currency, that User will recieve.
     */

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

    // Material UI lets us add React components to text props,
    // we will use it make two column layout inside each text element.
    let primaryTextComponent = 
      <div style={styles.splitTextContainer}>
        <div style={ styles.primaryTextLeftBlock }>
          {transactionText}
        </div>
        <div style={ styles.primaryTextRightBlock }>
          {reducedAmountText}
        </div>
      </div>;

    // Material UI lets us add React components to text props,
    // we will use it make two column layout inside each text element.
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
          style={ styles.listItem }
        />
    );
  }
}

TransactionListItem.propTypes = {
  transaction: PropTypes.object.isRequired
};
