import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';

import TopBar from '../components/ExchangeHistory/TopBar';

const styles = {
  screenContainer:{
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'white'
  },

  listContainer:{
    width: '100%',
    overflow: 'scroll',
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
    if(windowWidth < 640){
      topBar = <TopBar exchangeButtonDidPress={exchangeButtonDidPress}/>
    }

    return (
      <div style={ containerStyle }>
        {topBar}
        <div style={ styles.listContainer }>
          <List>
            <ListItem
            />
          </List>
        </div>
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
