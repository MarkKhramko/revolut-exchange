import React, { Component } from "react";
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';

const styles = {

  componentContainer:{
    position: 'absolute',
    top: 8,
    left: 8,
    width: 80,
    height : 60,

    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer:{
    color: 'white',
    fontSize: 25
  }
}

export default class RateListTextAvatar extends Avatar {

  render() {

    const{
      text
    } = this.props;

    return (
      <div 
        style={ styles.componentContainer }
      >
        <div style={ styles.textContainer }>
          {text}
        </div>
      </div>
    );
  }
}

RateListTextAvatar.propTypes = {
  text: PropTypes.string.isRequired
};
