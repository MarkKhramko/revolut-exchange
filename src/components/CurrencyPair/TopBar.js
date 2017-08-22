import React, { Component } from "react";
import PropTypes from 'prop-types';

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
    justifyContent: 'center'
  },

  titleContainer:{
    color: 'white',
    fontSize: 20
  }
}

export default class TopBar extends Component {

  render() {
    const { 
      title
    } = this.props;

    return (
      <div style={ styles.componentContainer }>
        <div style={ styles.titleContainer }>
          {title}
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired
};

TopBar.BAR_HEIGHT = styles.componentContainer.height + 4;