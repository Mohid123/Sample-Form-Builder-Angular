import { counterReducer, CounterState } from "../components/state/counter.reducer";

export interface AppState {
  counter: CounterState
}

export const AppReducer = {
  counter: counterReducer
}