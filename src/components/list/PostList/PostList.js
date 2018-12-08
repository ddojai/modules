import React from "react";
import styles from "./PostList.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostItem = ({ title, content, createdDate, tags, id }) => {
  const tagList = tags.map(tag => (
    <Link key={tag} to={`/tag/${tag}`}>
      #{tag}
    </Link>
  ));
  return (
    <div className={cx("post-item")}>
      <h2>
        <Link to={`/post/${id}`}>{title}</Link>
      </h2>
      <div className={cx("date")}>{createdDate}</div>
      <p>{
        content.split('\n').map( (line, key) => {
          return (<span key={key}>{line}<br/></span>)
        })
      }</p>
      <div className={cx("tags")}>{tagList}</div>
    </div>
  );
};

const PostList = ({ posts }) => {
  const postList = posts.map(
    (post) => {
      const { id, title, content, createdDate, tags } = post.toJS();
      return (
        <PostItem
          title={title}
          content={content}
          createdDate={createdDate}
          tags={tags}
          key={id}
          id={id}
        />
      )
    }
  );

  return (
    <div className={cx("post-list")}>
      {postList}
    </div>
  );
};

export default PostList;
