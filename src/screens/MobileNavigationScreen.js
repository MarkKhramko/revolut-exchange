import React, { Component } from "react";
import { connect } from 'react-redux';

import NavigationStack from '../components/NavigationStack';
import ExchangeHistoryScreen from './ExchangeHistoryScreen';

const styles = {
  screenContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    backgroundColor: '#F2F2F2'
  },

  controlContainer:{
    width: 265,
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FF5F26'
  },

  listTitle:{
    fontSize: 20,
    color: 'white'
  },

  list:{
    backgroundColor: 'white'
  },

  textFieldContaier:{
    backgroundColor: 'white',
    padding: 12
  },

  textField: {
    width: '100%'
  },

  propertiesButton:{
    width: 200,
    color: 'white',
    backgroundColor: '#FFA339'
  },

  previewContainer:{
    position: 'relative',
    height: '100%',
    padding: 12,
    paddingLeft: 0,
  },

  previewImageContainer:{
    width: '100%'
  },

  previewImage:{
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  downloadButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    textAlign: 'center'
  },

  downloadButton:{
    width: 200,
    backgroundColor: '#FF5F26',
    color: 'white',
    boxShadow:'0px 4px 25px 4px rgba(0,0,0,0.4)'
  }
}

class MobileNavigationScreen extends Component {

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
      windowHeight,
    } = this.state;

    const navigationStackProps = {
      components: [
        <ExchangeHistoryScreen 
          shouldShowTopBar={true}
          screenWidth={windowWidth}
        />
      ]
    };
    return (
    	<div style={ styles.screenContainer }>
        <NavigationStack 
            {...navigationStackProps}
            componentWidth={windowWidth}
            componentHeight={windowHeight}
          />
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
)(MobileNavigationScreen);