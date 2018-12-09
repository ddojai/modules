import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { ACCESS_TOKEN } from "commonConstants";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Base extends Component {
  initialize = async () => {
    const { BaseActions } = this.props;
    if (localStorage.getItem(ACCESS_TOKEN)) {
      BaseActions.tempLogin();
      await BaseActions.checkLogin();

      const { authenticated } = this.props;
      if (authenticated === false) {
        localStorage.removeItem(ACCESS_TOKEN);
      }
    } else {
      BaseActions.logout();
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <div>
        <Alert stack={{limit: 3}}
               timeout = {3000}
               position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    authenticated: state.base.get('authenticated')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);