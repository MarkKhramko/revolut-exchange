import React, { Component } from "react";
import PropTypes from 'prop-types';
import { PathLine } from 'react-svg-pathline'

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  }
}

const arrowSize = {
  width: 42,
  height: 20
}

export default class DarkenedArea extends Component {

  render() {
    const{
      width,
      height
    } = this.props;

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
      <svg style={styles.componentContainer}>
        <PathLine 
          points={linePoints} 
          stroke="none" 
          strokeWidth="1"
          fill="rgba(0,0,0, 0.3)"
          r={0}
        />
      </svg>
    );
  }
}

DarkenedArea.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};