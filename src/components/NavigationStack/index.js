import React, { Component } from "react";
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import ReactTransitions from 'react-transitions';
import * as TransitionConstants from './TransitionConstants';

const styles = {
  componentContainer:{
    display: 'flex'
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
      components: componentsArray,
      currentTransitionName: TransitionConstants.IN
    }
  }

  _pushComponent(component, transition){
    let components = this.state.components;
    let changedComponent = this._addNewPropsToComponent(component);
    components.push(changedComponent);
    let currentTransitionName = transition;
    this.setState({ components, currentTransitionName });
  }

  _popLastComponent(transition){
    let components = this.state.components;
    components.pop();
    let currentTransitionName = transition;
    this.setState({components, currentTransitionName});
  }

  pushComponent(component){
    this._pushComponent(component, TransitionConstants.IN);
  }

  popLastComponent(){
    this._popLastComponent(TransitionConstants.OUT);
  }

  pushModal(component){
    this._pushComponent(component, TransitionConstants.MODAL_IN);
  }

  popModal(){
    this._popLastComponent(TransitionConstants.MODAL_OUT);
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
      },
      pushModal:function(component){
        stackRef.pushModal(component);
      },
      popModal:function(){
        stackRef.popModal();
      },
    }
    return controller;
  }

  render() {
    const{
      components,
      currentTransitionName
    } = this.state;

    const{
      componentWidth,
      componentHeight
    }= this.props;

    let lastComponent = React.cloneElement(
      components[components.length-1],
      {
        screenWidth: componentWidth
      }
    );

    return (
      <ReactTransitions
        transition={ currentTransitionName }
        width={componentWidth}
        height={componentHeight}
        style={ styles.componentContainer }
      >
        { lastComponent }
      </ReactTransitions>
    );
  }
}

NavigationStack.propTypes = {
  components: PropTypes.array.isRequired,
  componentWidth: PropTypes.number.isRequired,
  componentHeight: PropTypes.number.isRequired
};
