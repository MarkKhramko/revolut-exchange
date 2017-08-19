import React, { Component } from "react";
import PropTypes from 'prop-types';

const styles = {
  componentContainer:{
    width: '100%',
    height: '100%'
  }
}

export default class NavigationStack extends Component {

  constructor(props){
    super(props);

    props.components.forEach((component)=>{
      component.props.push()
    });

    let componentsArray = [];
       // ? this.props.components : [<div></div>];

    this.state = {
      components: componentsArray
    }
  }

  pushComponent(){

  }

  popLastComponent(){

  }

  _createNavigationStackController(){
    let controller = {

    }
  }

  render() {
    const{
      components
    } = this.state;

    let lastComponent = components[components.length-1];

    return (
      <div style={ styles.componentContainer }>
        { lastComponent }
      </div>
    );
  }
}

NavigationStack.propTypes = {
  components: PropTypes.array
};
