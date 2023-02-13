import { createAction, props } from "@ngrx/store";
import { Posts } from "./post.state";

export const addPost = createAction('addPost', props<{post: Posts}>());
export const getPosts = createAction('getPosts');
export const removePost = createAction('removePost', props<{post: Posts}>());