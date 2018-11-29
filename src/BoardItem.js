import React, { Component } from 'react';
import { connect } from 'react-redux';

import { board_read, board_remove } from "./App_reducer";

class BoardItem extends Component {
  handleUpdateForm = (no) => {
    this.props.dispatch(board_read(no));
  };

  render() {
    const { board } = this.props;

    return (
      <tr>
        <td>{board.no}</td>
        <td>
          <button onClick={() => this.handleUpdateForm(board.no)}>{board.title}</button>
        </td>
        <td>{board.writer}</td>
        <td>{board.date.toLocaleDateString('ko-KR')}</td>
        <td>
          <button onClick={() => this.props.dispatch(board_remove(board.no))}>X</button>
        </td>
      </tr>
    )
  }
}

export default connect()(BoardItem);