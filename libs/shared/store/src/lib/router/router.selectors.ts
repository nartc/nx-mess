import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from './router-state.serializer';

export const routerFeatureKey = 'router';

const selectRouter =
  createFeatureSelector<RouterReducerState<CustomRouterState>>(
    routerFeatureKey
  );

const selectRouterState = createSelector(
  selectRouter,
  (router) => router.state
);

const selectQueryParams = createSelector(
  selectRouterState,
  (routerState) => routerState.queryParams
);

export const RouterSelectors = { selectRouter, selectQueryParams };
