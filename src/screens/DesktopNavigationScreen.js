import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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

    this.updateDimensions = this._updateDimensions.bind(this);
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
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  // #section-begin Interactions
  // #section-end Interactions

  render() {

    // Window size
    const {
      windowWidth,
      windowHeight
    } = this.props;

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
      zIndex: 10000
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