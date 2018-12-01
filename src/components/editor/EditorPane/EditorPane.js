import React, { Component } from "react";
import styles from "./EditorPane.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class EditorPane extends Component {
  handleChange = e => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({ name, value });
  };

  render() {
    const { handleChange } = this;
    const { tags, content, title } = this.props;

    return (
      <div className={cx("editor-pane")}>
        <input
          className={cx("title")}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <textarea
          className={cx("code-editor")}
          placeholder="내용을 입력하세요"
          name="content"
          value={content}
          onChange={handleChange}
        />
        <div className={cx("tags")}>
          <div className={cx("description")}>태그</div>
          <input 
            placeholder="태그를 입력하세요 (쉼표로 구분)" 
            name="tags" 
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }
}

export default EditorPane;
