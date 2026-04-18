import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';

function Home() {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="space-y-3">
      <CreatePost />
      <PostFeed
        posts={posts}
        loading={loading}
        emptyIcon="✦"
        emptyTitle="Nothing here yet"
        emptyDescription="Be the first to share something with the world."
      />
    </div>
  );
}

export default Home;
