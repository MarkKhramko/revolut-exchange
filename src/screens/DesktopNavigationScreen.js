import React, { Component } from "react";
import { connect } from 'react-redux';

import NavigationStack from '../components/NavigationStack';

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

    // Reference to binded method. Will be used by listeners.
    this.updateDimensions = this._updateDimensions.bind(this);
  }

  /**
   * Saves width and height of windows's rectangle. 
   * This method should be called each time window resizes.
   */
  _updateDimensions() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    this.setState({
      windowWidth,
      windowHeight 
    });
  }

  componentDidMount() {
    // Add listener to window resize event.
    window.addEventListener("resize", this.updateDimensions);
    // After component was added to DOM, save its width and height
    this._updateDimensions();
  }

  componentWillUnmount() {
    // Remove event listener, when components will be removed from DOM.
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {

    // windowWidth - Width of window's rectangle.
    // windowHeight - Height of window's rectangle.
    const {
      windowWidth,
      windowHeight
    } = this.props;

    // 320 - width of all iPhones up to 6
    let rightSplitContainerWidth = 320;
    let leftSplitContainerWidth = windowWidth - rightSplitContainerWidth;

    let leftSplitScreenContainerStyle = {
      ...styles.splitScreenContainer,
      width: leftSplitContainerWidth,
      overflow: 'hidden'
    }

    let rightSplitScreenContainerStyle = {
      ...styles.splitScreenContainer,
      width: rightSplitContainerWidth,
      overflow: 'scroll',
      zIndex: 10000 // Should overlap all animations in left side
    }

    const navigationStackProps = {
      components: [
        <ExchangeScreen isMobileView={false}/>
      ]
    };

    return (
    	<div style={ styles.screenContainer }>
        <div style={ leftSplitScreenContainerStyle }>
          <NavigationStack
            {...navigationStackProps}
            componentWidth={leftSplitContainerWidth}
            componentHeight={windowHeight}
          />
        </div>
        <div style={ rightSplitScreenContainerStyle }>
          <ExchangeHistoryScreen 
            screenWidth={ rightSplitContainerWidth }
            exchangeButtonDidPress={()=>this._exchangeButtonDidPress()}
          />
        </div>
      </div>
    );
  }
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