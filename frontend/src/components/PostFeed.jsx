import PostCard from './PostCard';

function SkeletonCard() {
  return (
    <div className="card p-4">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full skeleton flex-shrink-0" />
        <div className="flex-1 space-y-2.5 pt-0.5">
          <div className="flex gap-2 items-center">
            <div className="h-3 w-24 skeleton" />
            <div className="h-3 w-12 skeleton" />
          </div>
          <div className="h-3.5 w-full skeleton" />
          <div className="h-3.5 w-4/5 skeleton" />
          <div className="h-3.5 w-2/3 skeleton" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, description }) {
  return (
    <div className="card p-12 text-center animate-fade-in">
      <div className="text-4xl mb-4 select-none">{icon}</div>
      <p className="font-semibold text-gray-900 dark:text-gray-100 text-[15px]">{title}</p>
      <p className="text-sm text-muted mt-1">{description}</p>
    </div>
  );
}

function PostFeed({ posts, loading, emptyIcon, emptyTitle, emptyDescription }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostFeed;
