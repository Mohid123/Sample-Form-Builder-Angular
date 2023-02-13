import { counterReducer, CounterState } from "../components/state/counter.reducer";
import { postReducer } from "../components/state/post.reducer";
import { PostState } from "../components/state/post.state";

export interface AppState {
  counter: CounterState,
  posts: PostState
}

export const AppReducer = {
  counter: counterReducer,
  posts: postReducer
}