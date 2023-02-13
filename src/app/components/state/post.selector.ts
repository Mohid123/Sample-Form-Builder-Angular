import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.state";

const getPostState = createFeatureSelector<PostState>('posts'); //feature selector ensure that only that reducer is called which we need

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts
});
  