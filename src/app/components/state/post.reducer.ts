import { Action, createReducer, on } from "@ngrx/store";
import { addPost, getPosts } from "./post.actions";
import { initialPostState, PostState } from "./post.state";

const post = createReducer(initialPostState, on(getPosts, (state) => {
  return {
    ...state,
    posts: state.posts
  }
}),
on(addPost, (state, action) => {
  return {
    ...state,
    posts: [...state.posts, action.post]
  }
})
)

export const postReducer = (state: PostState | undefined, action: Action) => {
  return post(state, action)
}