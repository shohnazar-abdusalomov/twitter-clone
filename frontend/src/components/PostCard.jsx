import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Heart } from 'lucide-react';
import { toggleLike } from '../features/posts/postsSlice';

function formatTimeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [popping, setPopping] = useState(false);

  const handleLike = () => {
    setPopping(true);
    setTimeout(() => setPopping(false), 200);
    dispatch(toggleLike(post.id));
  };

  return (
    <article className="card card-hover group animate-fade-up">
      <div className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 avatar text-sm flex-shrink-0">
            {post.username?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-[14px] text-gray-900 dark:text-gray-100 leading-none">
                {post.username}
              </span>
              <span className="text-gray-300 dark:text-white/20 text-xs">·</span>
              <span className="text-xs text-muted leading-none">
                {formatTimeAgo(post.created_at)}
              </span>
            </div>

            {/* Content */}
            <p className="mt-2 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {post.content}
            </p>

            {/* Image */}
            {post.image_url && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.06]">
                <img
                  src={post.image_url}
                  alt=""
                  className="w-full max-h-72 object-cover"
                  onError={(e) => { e.target.closest('div').style.display = 'none'; }}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-xs font-medium
                            transition-all duration-150 select-none
                            ${post.isLiked
                              ? 'text-red-500'
                              : 'text-muted hover:text-red-500'
                            }`}
              >
                <Heart
                  size={16}
                  fill={post.isLiked ? 'currentColor' : 'none'}
                  className={`transition-transform duration-150
                              ${popping ? 'animate-like-pop' : ''}
                              ${!post.isLiked ? 'group-hover:scale-105' : ''}`}
                />
                <span className="tabular-nums">{post.like_count || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
