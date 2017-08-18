import React, { Component } from "react";

const styles = {
  componentContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  backgroundImage:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },

  buttonExchange:{
    width: 44,
    height: 44
  }
}

export default class BackgroundBubbles extends Component {

  render() {
    const { exchangeButtonDidPress } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <img 
          src={require('../static/blue-gradient.png')}
          style={ styles.backgroundImage }
        />
        
      </div>
    );
  }
}
