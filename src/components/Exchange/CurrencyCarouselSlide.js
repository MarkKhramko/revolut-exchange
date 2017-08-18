import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = {
  componentContainer:{
    padding: 30,
    height: '100%'
  },

  topRowContainer:{
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },

  currencyCode:{
    width: '50%',
    fontSize: 28,
    color: 'white'
  },

  numericInput:{
    width: '50%',
    padding: 0,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 28,
    border: 0
  }
}

class CurrencyCarouselSlide extends Component {

  render() {
    const {
    } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <div style={ styles.topRowContainer }>
          <div style={ styles.currencyCode }>
            GBP
          </div>
          <div>
            <input 
              type="text" 
              style={ styles.numericInput }
            />
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

CurrencyCarouselSlide.propTypes = {
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
)(CurrencyCarouselSlide);
