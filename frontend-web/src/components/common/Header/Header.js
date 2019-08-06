import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = ({ postId, isWriter, authenticated, onRemove, onLogout }) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/">reactblog</Link>
      </div>
      <div className={cx('right')}>
        {
          isWriter && postId && [
            // flex를 유지하려고 배열 형태로 렌더링 합니다.
            <Button key="edit" theme="outline" to={`/editor?id=${postId}`}>수정</Button>,
            <Button key="remove" theme="outline" onClick={onRemove}>삭제</Button>
          ]
        }
        {
          authenticated && <Button theme="outline" to="/editor">새 포스터</Button>
        }
        {
          authenticated
            ? <Button theme="outline" onClick={onLogout}>로그아웃</Button>
            : <Button theme="outline" to="/auth">로그인/가입</Button>
        }
      </div>
    </div>
  </header>
);

export default Header;
