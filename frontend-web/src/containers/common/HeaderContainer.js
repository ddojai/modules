import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ACCESS_TOKEN } from 'commonConstants';
import Alert from 'react-s-alert';

class HeaderContainer extends Component {
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  };

  handleLogout = () => {
    const { BaseActions } = this.props;

    localStorage.removeItem(ACCESS_TOKEN);
    BaseActions.logout();
    Alert.success('You\'re safely logged out!');
  };

  render() {
    const { handleRemove, handleLogout } = this;
    const { match, authenticated, currentUser, post } = this.props;

    const { id } = match.params;

    let isWriter = false;
    if (currentUser.toJS().id !== undefined && post.toJS().user !== undefined) {
      if (currentUser.toJS().id === post.toJS().user.id) {
        isWriter = true;
      }
    }

    return (
      <Header
        postId={id}
        isWriter={isWriter}
        authenticated={authenticated}
        onRemove={handleRemove}
        onLogout={handleLogout}
      />);
  }
}

export default connect(
  (state) => ({
    currentUser: state.base.get('currentUser'),
    post: state.post.get('post'),
    authenticated: state.base.get('authenticated')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));
