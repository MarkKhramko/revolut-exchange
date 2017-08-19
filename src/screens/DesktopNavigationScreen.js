import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Tabs from '../constants/Tabs';

import ExchangeScreen from './ExchangeScreen';
import ExchangeHistoryScreen from './ExchangeHistoryScreen';

const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',

    margin: 0,
    padding: 0
  },

  splitScreenContainer:{
  },
}

class DesktopNavigationScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      windowWidth: 0,
      windowHeight: 0
    }
  }

  _updateDimensions() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    this.setState({ windowWidth, windowHeight });
  }

	componentWillMount(){
    this._updateDimensions();
	}

  componentDidMount() {
    window.addEventListener("resize", this._updateDimensions.bind(this));
  }

  // #section-begin Interactions
  // #section-end Interactions

  render() {

    // Window size
    const {
      windowWidth,
      windowHeight
    } = this.props;

    let rightSplitContainerWidth = 300;
    let leftSplitContainerWidth = windowWidth - 300;

    let leftSplitScreenContainerStyle = {
      ...styles.splitScreenContainer,
      width: leftSplitContainerWidth
    }

    let rightSplitScreenContainerStyle = {
      ...styles.splitScreenContainer,
      width: rightSplitContainerWidth
    }

    return (
    	<div style={ styles.screenContainer }>
        <div style={ leftSplitScreenContainerStyle }>
          <ExchangeScreen 
            windowWidth={leftSplitContainerWidth}
            windowHeight={windowHeight}
          />
        </div>
        <div style={ rightSplitScreenContainerStyle }>
          <ExchangeHistoryScreen 
            windowWidth={ windowWidth }
            exchangeButtonDidPress={()=>this._exchangeButtonDidPress()}
          />
        </div>
      </div>
    );
  }
}

DesktopNavigationScreen.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired
}

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
)(DesktopNavigationScreen);