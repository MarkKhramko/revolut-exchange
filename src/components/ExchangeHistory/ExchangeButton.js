import React, { Component } from "react";
import PropTypes from 'prop-types';

import IconAutorenew from 'material-ui/svg-icons/action/autorenew';

const styles = {

  componentContainer:{
    position: 'relative',
    width: 60,
    height : 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },

  roundArea:{
    width: 44,
    height : 44,
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
    borderRadius: '50%',
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderWidth: 1.5,
    borderStyle: 'solid'
  },

  icon:{
    color: 'white',
    height: 23,
    padding: 10,
    paddingTop: 12
  },

  labelContainer:{
    width: 60,
    textAlign: 'center'
  },

  label:{
    color: 'white',
    fontSize: 10
  }
}

export default class RateButton extends Component {

  render() {

    const{
      onTouchTap
    } = this.props;

    return (
      <div 
        onTouchTap={onTouchTap}
        style={ styles.componentContainer }
      >
        <div style={ styles.roundArea }>
          <IconAutorenew
            style={ styles.icon }
          />
        </div>
        <div style={ styles.labelContainer }>
          <span style={ styles.label }>
            EXCHANGE
          </span>
        </div>
      </div>
    );
  }
}

RateButton.propTypes = {
  onTouchTap: PropTypes.func,
};

RateButton.defaultPropTypes = {
  buttonDidPress: ()=>{},
};
