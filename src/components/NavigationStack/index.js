import React, { Component } from "react";
import PropTypes from 'prop-types';

import uuidv4 from 'uuid/v4';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = {
  componentContainer:{
    width: '100%',
    height: '100vh'
  }
}

export default class NavigationStack extends Component {

  constructor(props){
    super(props);

    let componentsArray = [];
    props.components.forEach((component)=>{
      componentsArray.push(this._addNewPropsToComponent(component))
    });

    this.state = {
      components: componentsArray
    }
  }

  pushComponent(component){
    let components = this.state.components;
    let changedComponent = this._addNewPropsToComponent(component);
    components.push(changedComponent);
    this.setState({components});
  }

  popLastComponent(){
    let components = this.state.components;
    components.pop();
    this.setState({components});
  }

  _addNewPropsToComponent(component){

    let stackRef = this;

    let newComponent =  React.cloneElement(
      component,
      {
        key: uuidv4(),
        navigationStackController: this._createNavigationStackController(stackRef)
      }
    );
    return newComponent;
  }

  _createNavigationStackController(stackRef){
    let controller = {
      push:function(component){
        stackRef.pushComponent(component);
      },
      pop:function(){
        stackRef.popLastComponent();
      }
    }
    return controller;
  }

  render() {
    const{
      components
    } = this.state;

    let lastTwoComponents = [];
    for(let i=components.length-1; (i < components.length-2 || i == 0); i--){
      let component = components[i];
      lastTwoComponents.push(component);
    }

    return (
      <ReactCSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
        <div style={ styles.componentContainer }>
          { components[components.length-1] }
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

NavigationStack.propTypes = {
  components: PropTypes.array
};
