import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { ACCESS_TOKEN } from "commonConstants";

class Base extends Component {
  initialize = async () => {
    const { BaseActions } = this.props;
    if (localStorage.getItem(ACCESS_TOKEN)) {
      BaseActions.checkLogin();
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);