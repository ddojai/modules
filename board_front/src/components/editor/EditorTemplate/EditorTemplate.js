import React, { Component } from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorTemplate extends Component {
  render() {
    const { header, editor } = this.props;
    return (
      <div className={cx('editor-template')}>
        {header}
        <div className={cx('panes')}>
          {editor}
        </div>
      </div>
    );
  }
}

export default EditorTemplate;