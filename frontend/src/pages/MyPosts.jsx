import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts } from '../features/posts/postsSlice';
import PostFeed from '../components/PostFeed';

function MyPosts() {
  const dispatch = useDispatch();
  const { items: posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="animate-fade-up">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">My Posts</h1>
        <p className="text-sm text-muted mt-0.5">Everything you've shared</p>
      </div>
      <PostFeed
        posts={posts}
        loading={loading}
        emptyIcon="📝"
        emptyTitle="No posts yet"
        emptyDescription="Head to the home feed and share your first thought."
      />
    </div>
  );
}

export default MyPosts;
