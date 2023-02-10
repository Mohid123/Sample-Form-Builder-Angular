import { initialState } from "./counter.state";
import { Action, createReducer, on } from "@ngrx/store";
import { changeName, customIncrement, decrement, increment, reset } from "./counter.actions";

const counter = createReducer(initialState, on(increment, (state) => {
  return {
    ...state,
    counter: state.counter + 1
  }
}),
on(decrement, (state) => {
  return {
    ...state,
    counter: state.counter - 1
  }
}),
on(reset, (state) => {
  return {
    ...state,
    counter: 0
  }
}),
on(customIncrement, (state, action) => {
  return {
    ...state,
    counter: Number(state.counter + action.value)
  }
}),
on(changeName, (state, action) => {
  return {
    ...state,
    name: action.name
  }
})
);

export interface CounterState {
   counter: number,
   name: string
}

export const counterReducer = (state: CounterState | undefined, action: Action) => {
  return counter(state, action)
}