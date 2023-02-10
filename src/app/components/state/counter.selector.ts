import { createFeatureSelector, createSelector } from "@ngrx/store";

const getCounterState = createFeatureSelector<any>('counter'); //feature selector ensure that only that reducer is called which we need

export const getCounter = createSelector(getCounterState, state => {
  return state.counter
}); // will only call the counter state

export const getName = createSelector(getCounterState, state => {
  return state.name
}); // will only call the name state