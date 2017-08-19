import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NavigationController from 'react-navigation-controller';

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
    height: '100%'
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

    const navigationControlelrProps = {
      // The views to place in the stack. The front-to-back order
      // of the views in this array represents the new bottom-to-top
      // order of the navigation stack. Thus, the last item added to
      // the array becomes the top item of the navigation stack.
      // NOTE: This can only be updated via `setViews()`
      views: [
        <ExchangeScreen />
      ],
      preserveState: true,
      transitionTension: 12
    };

    return (
    	<div style={ styles.screenContainer }>
        <div style={ leftSplitScreenContainerStyle }>
          <NavigationController 
            {...navigationControlelrProps}
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