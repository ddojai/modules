import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostBody = ({ content }) => {
  let contentString = String(content);
  return (
    <div className={cx('post-body')}>
      <div className={cx('paper')}>
        {
          contentString.split('\n').map((line, key) => {
            return (<span key={key}>{line}<br/></span>)
          })
        }
      </div>
    </div>
  )
};

export default PostBody;
