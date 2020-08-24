import React from 'react';
import { Container } from '@material-ui/core';
import PostList from 'components/posts/PostList';
import Header from 'components/common/Header';

function PostListPage() {
  return (
    <Container>
      <Header />
      <PostList />
    </Container>
  );
}

export default PostListPage;