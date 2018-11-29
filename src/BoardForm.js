import React, { Component } from 'react';
import { connect } from 'react-redux';

import { board_save } from "./App_reducer";

class BoardForm extends Component {
  state = {};
  initialSelectedBoard = {
    no: "",
    title: "",
    writer: "",
    date: ""
  };

  handleChange = (e) => {
    this.setState ({
      [e.target.name]: e.target.value
    });
  };

  handleSave = () => {
    this.props.dispatch(board_save(this.state));
    this.setState(this.initialSelectedBoard);
  };

  componentWillReceiveProps(nextProps) {
    this.setState (nextProps.selectedBoard);
  }

  render() {
    return (
      <div>
        <input placeholder="title" name="title" value={this.state.title} onChange={this.handleChange}/>
        <input placeholder="name" name="writer" value={this.state.writer} onChange={this.handleChange}/>
        <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    selectedBoard: state.selectedBoard
  };
};

export default connect(mapStateToProps)(BoardForm);