import React, { Component } from 'react';
import SocialLogin from 'components/auth/SocialLogin/SocialLogin';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class LoginContainers extends Component {

  render() {
    const { authenticated } = this.props;

    if (authenticated) {
      return <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}/>;
    }

    return (
      <SocialLogin/>
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
)(LoginContainers);
