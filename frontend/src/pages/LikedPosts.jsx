import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedPosts } from '../features/posts/postsSlice';
import PostFeed from '../components/PostFeed';

function LikedPosts() {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchLikedPosts());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="animate-fade-up">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Liked Posts</h1>
        <p className="text-sm text-muted mt-0.5">Posts you've hearted</p>
      </div>
      <PostFeed
        posts={posts}
        loading={loading}
        emptyIcon="♡"
        emptyTitle="No liked posts"
        emptyDescription="Tap the heart on any post to save it here."
      />
    </div>
  );
}

export default LikedPosts;
