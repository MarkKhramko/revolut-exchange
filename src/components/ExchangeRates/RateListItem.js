import React from "react";
import PropTypes from 'prop-types';

import {ListItem} from 'material-ui/List';

import RateListTextAvatar from './RateListTextAvatar';

const styles = {
	listItem:{
		backgroundColor: 'rgba(0,0,0,0.17)',
		borderBottom: '0.5px solid rgba(0,0,0,0.21)'
	},

	splitTextContainer:{
		width: '100%',
		display: 'block',
	},

	primaryTextRightBlock:{
		float: 'right',
		color: 'white'
	},

	secondaryTextRightBlock:{
		float: 'right',
		color: 'white'
	},

	smallFont:{
		fontSize: 11,
		letterSpacing: '0.08em'
	},

	bigFont: {
		fontSize: 20,
		letterSpacing: '0.02em'
	}
}

export default class RateListItem extends ListItem {

	render() {

	    const{
	      currencyPairData
	    } = this.props;

	    let fromCurrency = currencyPairData.fromCurrency;
	    let toCurrency = currencyPairData.toCurrency;
	    let exchangeRate = currencyPairData.exchangeRate;

	    let fromCurrencyCodeText = "1 " + fromCurrency.Code;
	    let toCurrencyNameText = toCurrency.Description;

	    let rateWithFourDigitsAfterPoint = exchangeRate.toFixed(4);
	    // Extract last two digits as string
	    let rateLastTwoDigits = rateWithFourDigitsAfterPoint.slice(-2);

	    let primaryTextComponent = 
	      <div style={styles.splitTextContainer}>
	        <div style={ styles.primaryTextRightBlock }>
	          <span style={ styles.bigFont }>
	              { exchangeRate.toFixed(2) }
	            </span>
	            <span style={ styles.smallFont }>
	              { rateLastTwoDigits }
	            </span>
	        </div>
	      </div>;

	    let secondaryTextComponent = 
	      <div style={styles.splitTextContainer}>
	        <div style={ styles.secondaryTextRightBlock }>
	          {toCurrencyNameText}
	        </div>
	      </div>;

	    return (
	        <ListItem
	        	leftAvatar={
	        		<RateListTextAvatar 
	        			text={ fromCurrencyCodeText }
	        		/>
	        	}
	            primaryText={primaryTextComponent}
	            secondaryText={secondaryTextComponent}
	            style={ styles.listItem }
	            disabled={ true }
	        />
	    );
  	}
}

RateListItem.propTypes = {
	currencyPairData: PropTypes.object.isRequired
}