import React, { Component } from "react";
import Header from "components/common/Header";
import { withRouter } from "react-router-dom";
import * as baseActions from "store/modules/base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ACCESS_TOKEN } from "commonConstants";
import Alert from 'react-s-alert';

class HeaderContainer extends Component {
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal("remove");
  };

  handleLogout = () => {
    const { BaseActions } = this.props;

    localStorage.removeItem(ACCESS_TOKEN);
    BaseActions.logout();
    Alert.success("You're safely logged out!");
  };

  render() {
    const { handleRemove, handleLogout } = this;
    const { match, authenticated } = this.props;

    const { id } = match.params;

    return (
      <Header
        postId={id}
        authenticated={authenticated}
        onRemove={handleRemove}
        onLogout={handleLogout}
      />);
  }
}

export default connect(
  (state) => ({
    authenticated: state.base.get('authenticated')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));
