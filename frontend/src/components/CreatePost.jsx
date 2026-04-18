import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImagePlus, X, ArrowUp } from 'lucide-react';
import { createPost } from '../features/posts/postsSlice';

function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { creating } = useSelector((state) => state.posts);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [focused, setFocused] = useState(false);
  const fileRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || creating) return;
    const fd = new FormData();
    fd.append('content', content.trim());
    if (image) fd.append('image', image);
    const result = await dispatch(createPost(fd));
    if (createPost.fulfilled.match(result)) {
      setContent('');
      removeImage();
    }
  };

  const canPost = content.trim().length > 0 && !creating;

  return (
    <div className={`card p-4 transition-shadow duration-200 ${focused ? 'shadow-card-hover' : ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="w-9 h-9 avatar text-sm">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="What's on your mind?"
              rows={1}
              disabled={creating}
              className="w-full resize-none bg-transparent border-0 outline-none
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600
                         text-[15px] leading-relaxed pt-1.5 overflow-hidden
                         disabled:opacity-50"
            />

            {preview && (
              <div className="relative mt-3 inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-28 w-auto rounded-xl object-cover border border-gray-100 dark:border-white/[0.06]"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                             bg-gray-900 dark:bg-white text-white dark:text-gray-900
                             flex items-center justify-center
                             hover:scale-110 transition-transform duration-150"
                >
                  <X size={11} />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 divider">
              <div className="flex items-center gap-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                  disabled={creating}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={creating}
                  className="btn-ghost p-2 disabled:opacity-40"
                  title="Add image"
                >
                  <ImagePlus size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {content.length > 0 && (
                  <span className={`text-xs tabular-nums transition-colors duration-150 ${
                    content.length > 260
                      ? 'text-red-500'
                      : content.length > 220
                      ? 'text-amber-500'
                      : 'text-muted'
                  }`}>
                    {280 - content.length}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={!canPost}
                  className="btn-primary h-8 px-4 text-xs gap-1.5"
                >
                  {creating ? (
                    <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  ) : (
                    <ArrowUp size={14} />
                  )}
                  {creating ? 'Posting…' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
