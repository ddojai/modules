import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import * as postActions from 'store/modules/post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Post extends Component {
  initialize = async () => {
    const { PostActions, id } = this.props;
    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { loading, post } = this.props;

    if (loading) return null;

    const { title, content, createdDate, tags, user } = post.toJS();
    return (
      <div>
        <PostInfo title={title} createdDate={createdDate} tags={tags} user={user}/>
        <PostBody content={content}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    post: state.post.get('post'),
    loading: state.pender.pending['post/GET_POST']  // 로딩 상태
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Post);
