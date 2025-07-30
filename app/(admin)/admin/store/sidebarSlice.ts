import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  posts: boolean;
  topics: boolean;
  tips: boolean;
}

const initialState: SidebarState = {
  posts: false,
  topics: false,
  tips: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    togglePosts: (state) => {
      state.posts = !state.posts
      if (state.posts) {
        state.topics = false
        state.tips = false
      }
    },
    toggleTopics: (state) => {
      state.topics = !state.topics
      if (state.topics) {
        state.posts = false
        state.tips = false
      }
    },
    toggleTips: (state) => {
      state.tips = !state.tips
      if (state.tips) {
        state.posts = false
        state.topics = false
      }
    }
  }
})

export const {
  togglePosts,
  toggleTips,
  toggleTopics
} = sidebarSlice.actions
export default sidebarSlice.reducer