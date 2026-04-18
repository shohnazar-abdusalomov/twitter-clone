import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postAPI, likeAPI } from '../../services/api';

export const createPost = createAsyncThunk('posts/create', async (formData, { rejectWithValue }) => {
  try {
    const response = await postAPI.create(formData);
    return response.data.post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to create post');
  }
});

export const fetchPosts = createAsyncThunk('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await postAPI.getAll();
    return response.data.posts;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch posts');
  }
});

export const fetchMyPosts = createAsyncThunk('posts/fetchMy', async (_, { rejectWithValue }) => {
  try {
    const response = await postAPI.getMyPosts();
    return response.data.posts;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch posts');
  }
});

export const fetchLikedPosts = createAsyncThunk('posts/fetchLiked', async (_, { rejectWithValue }) => {
  try {
    const response = await postAPI.getLikedPosts();
    return response.data.posts;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch posts');
  }
});

export const toggleLike = createAsyncThunk('posts/toggleLike', async (postId, { rejectWithValue }) => {
  try {
    const response = await likeAPI.toggle(postId);
    return { postId, ...response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to toggle like');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
    creating: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLikedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLikedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLikedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, liked, likeCount } = action.payload;
        const post = state.items.find((p) => p.id === postId);
        if (post) {
          post.isLiked = liked;
          post.like_count = likeCount;
        }
      });
  },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;