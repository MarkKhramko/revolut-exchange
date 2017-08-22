import React, { Component } from "react";
import { PathLine } from 'react-svg-pathline'

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },

  svg:{
    width: '100%',
    height: '100%'
  }
}

const arrowSize = {
  width: 42,
  height: 20
}

export default class DarkenedArea extends Component {

  constructor(props){
    super(props);

    this.state = {
      width: 0, // Width of component's rectangle.
      height: 0 // Height of component's rectangle.
    }
  }

  componentDidMount() {
    // Add listener to window resize event.
    window.addEventListener("resize", this._updateDimensions.bind(this));
    // After component was added to DOM, save its width and height
    this._updateDimensions();
  }

  componentWillUnmount() {
    // Remove event listener, when components will be removed from DOM.
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Saves width and height of component's rectangle. 
   * This method should be called each time window resizes.
   */
  _updateDimensions(){
    if(this.refs.container){
      let width = this.refs.container.offsetWidth;
      let height = this.refs.container.offsetWidth;
      this.setState({ width, height });
    }
  }

  render() {

    // width - Width of component's rectangle.
    // height - Height of component's rectangle.
    const{
      width,
      height
    } = this.state;

    // Points that go around component's rectangle and makes little arrow in the middle.
    let linePoints = [
      {x:0, y:0},
      {x:width/2 - arrowSize.width/2, y: 0},
      {x:width/2, y:arrowSize.height}, 
      {x:width/2 + arrowSize.width/2, y:0},
      {x:width, y:0},
      {x:width, y:height},
      {x:0, y: height},
      {x:0, y: 0},
    ];

    return (
      <div
        ref="container"
        style={styles.componentContainer}
      >
        <svg
        style={styles.svg}>
        <PathLine 
          points={linePoints} 
          stroke="none" 
          strokeWidth="1"
          fill="rgba(0,0,0, 0.3)"
          r={0} // Radius of joint curves
        />
      </svg>
      </div>
    );
  }
}