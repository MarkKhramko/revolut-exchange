import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAutorenew from 'material-ui/svg-icons/action/autorenew';

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60
  },

  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },

  buttonExchange:{
    width: 44,
    height: 44
  }
}

class TopBar extends Component {

  _handleExchangeButtonAction(){
  }

  render() {
    const { exchangeButtonDidPress } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <img 
          src={require('../../static/blur-bg.png')}
          style={ styles.backgroundImage }
        />
        <FloatingActionButton 
          style={ styles.buttonExchange }
          backgroundColor='#0090FD'
          onTouchTap={ exchangeButtonDidPress }
        >
          <IconAutorenew />
        </FloatingActionButton>
      </div>
    );
  }
}

TopBar.propTypes = {
  exchangeButtonDidPress: PropTypes.func.isRequired
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
)(TopBar);
