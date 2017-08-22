import React, { Component } from "react";
import PropTypes from 'prop-types';

import FlatButton from 'material-ui/FlatButton';

const styles = {
  componentContainer:{
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    padding: 5,
    zIndex: 100,
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer:{
    paddingTop: 8,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around'
  },

  button: {
    borderRadius: 5,
    padding: 0
  },

  buttonLabel:{
    color: 'white',
    fontSize: '0.75em',
    letterSpacing: '0.05em',
    padding: 7
  },

  titleContainer:{
    color: 'white',
    color: 'white',
    fontSize: 22,
    padding: 4
  }
}

export default class TopBar extends Component {

  render() {
    const { 
      title,
      didPressCancelButton
    } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <div style={ styles.innerContainer }>

          <FlatButton 
            label="Cancel"
            onTouchTap={ didPressCancelButton }
            hoverColor="#0D55A5"
            labelStyle={ styles.buttonLabel }
            style={styles.button}
          />

          <div style={ styles.titleContainer }>
            {title}
          </div>

          <div style={{width: 88}}>
          </div>

        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  didPressCancelButton: PropTypes.func.isRequired
};

TopBar.BAR_HEIGHT = styles.componentContainer.height + 4;