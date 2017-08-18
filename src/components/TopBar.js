import React, { Component } from "react";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../actions/auth';

import Button from 'material-ui/Button';

const styles = {
  topBar:{
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    boxShadow:'0px 8px 14px 0px rgba(0,0,0,0.21)',
    backgroundColor: '#E5C59A'
  },

  topBarLeftContainer:{
    display: 'block',
    float: 'left',
    width: 200,
    height: 60,
    padding: 12,
  },

  topBarTitle:{
    fontSize: 20,
    height: 36,
    padding: 8
  },

  topBarRightContainer:{
    display: 'block',
    float: 'right',
    width: 200,
    height: 60,
    padding: 12
  }
}

class TopBar extends Component {

  _handleLogoutButtonAction(){
    console.log('Clear token');
    const { authActions } = this.props;

    authActions.setToken("");
    sessionStorage.setItem('token', "");
  }

  render() {
    return (
      <div style={ styles.topBar }>
        <div style={ styles.topBarLeftContainer }>
          <div style={ styles.topBarTitle }>
            Создание Диплома
          </div>
        </div>
        <div style={ styles.topBarRightContainer }>
          <Button
            onTouchTap={()=>this._handleLogoutButtonAction()}
          >
            Выйти
          </Button>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {

};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
