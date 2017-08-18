import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';

import TopBar from '../components/ExchangeHistory/TopBar';

const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    overflowY: 'scroll',
    margin: 0,
    padding: 0,
    backgroundColor: 'white'
  },

  topBarContainer:{
    width: '100%',
    height: 60
  }
}

class ExchangeHistoryScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
    }
  }

  render() {

    const {
      windowWidth,

      exchangeButtonDidPress
    } = this.props;

    let containerStyle = {
      ...styles.screenContainer,
      width: windowWidth
    };

    let topBar = <div></div>;
    if(windowWidth < 768){
      topBar = <TopBar exchangeButtonDidPress={exchangeButtonDidPress}/>
    }

    return (
      <div style={ containerStyle }>
        <div style={ styles.topBarContainer }>
          {topBar}
        </div>
        <List>
          <ListItem
          />
        </List>
      </div>
    );
  }
}

ExchangeHistoryScreen.propTypes = {
  windowWidth: PropTypes.number.isRequired,

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
)(ExchangeHistoryScreen);
