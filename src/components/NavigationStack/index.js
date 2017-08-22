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
    // With props we received array of components, but before rendering them, 
    // we should add additional props, such as key and stackController
    props.components.forEach((component)=>{
      componentsArray.push(this._addNewPropsToComponent(component))
    });

    this.state = {
      components: componentsArray,
      currentTransitionName: TransitionConstants.IN
    }
  }

  // #section-begin Stack control methods
  /**
   * Saves new component to stack.
   * @param {Object} component - Component to add to stack.
   * @param {String} transition - Transiion animation name.
   */
  _pushComponent(component, transition){
    let components = this.state.components;
    let changedComponent = this._addNewPropsToComponent(component);
    components.push(changedComponent);
    let currentTransitionName = transition;
    this.setState({ components, currentTransitionName });
  }

  /**
   * Removes the top most component from stack.
   * @param {String} transition - Transiion animation name.
   */
  _popLastComponent(transition){
    let components = this.state.components;
    components.pop();
    let currentTransitionName = transition;
    this.setState({components, currentTransitionName});
  }
  // #section-end Stack control methods

  // #section-begin Public methods
  /**
   * Saves new component to stack with default transition in animation.
   */
  pushComponent(component){
    this._pushComponent(component, TransitionConstants.IN);
  }

  /**
   * Removes the top most component from with default transition out animation.
   */
  popLastComponent(){
    this._popLastComponent(TransitionConstants.OUT);
  }

  /**
   * Saves new component to stack with modal transition in animation.
   */
  pushModal(component){
    this._pushComponent(component, TransitionConstants.MODAL_IN);
  }

  /**
   * Removes the top most component from with modal transition out animation.
   */
  popModal(){
    this._popLastComponent(TransitionConstants.MODAL_OUT);
  }
  // #section-end Public methods

  /**
   * Returns the same component with new props, such as
   * unique key
   * navigationStackController object
   *
   * @param {Object} component - Component to modify
   * @returns {Object} Modified component
   */
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

  /**
   * Returns NavigationStackController object. 
   * It is remote for components in the stack to control stack.
   *
   * @param {Object} stackRef - Reference to the stack (This class).
   * @returns {Object} controller
   */
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

    // Before adding component to the DOM, pass current screen width.
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
