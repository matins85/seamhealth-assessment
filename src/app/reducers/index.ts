import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromExample from './irm.reducers';

export interface AppState {
  example: fromExample.State;
}

// export const reducers: ActionReducerMap<AppState, any> = {
//   example: fromExample.reducer,
// };

// Example selectors
export const selectExampleModule =
  createFeatureSelector<fromExample.State>('example');

// export const selectProfileState = createSelector(
//   selectExampleModule,
//   fromExample.selectProfileState
// );
// export const selectStatesState = createSelector(
//   selectExampleModule,
//   fromExample.selectStatesState
// );
// export const selectYearState = createSelector(
//   selectExampleModule,
//   fromExample.selectYearState
// );
// export const selectIndPayerState = createSelector(
//   selectExampleModule,
//   fromExample.selectIndPayerState
// );
// export const selectComPayerState = createSelector(
//   selectExampleModule,
//   fromExample.selectComPayerState
// );
// export const selectPayeeState = createSelector(
//   selectExampleModule,
//   fromExample.selectPayeeState
// );
//   export const selectTransactionState = createSelector(selectExampleModule, fromExample.selectTransactionState);
//   export const selectNotificationState = createSelector(selectExampleModule, fromExample.selectNotificationState);
//   export const selectTaskState = createSelector(selectExampleModule, fromExample.selectTaskState);
//   export const selectAdmin_AgentState = createSelector(selectExampleModule, fromExample.selectAdmin_AgentState);
//   export const selectCouponState = createSelector(selectExampleModule, fromExample.selectCouponState);
//   export const selectSpecial_OrderState = createSelector(selectExampleModule, fromExample.selectSpecial_OrderState);
//   export const selectUserState = createSelector(selectExampleModule, fromExample.selectUserState);

// export const selectAllProfile = createSelector(
//   selectProfileState,
//   fromExample.selectAllProfile
// );
// export const selectAllStates = createSelector(
//   selectStatesState,
//   fromExample.selectAllStates
// );
// export const selectAllYear = createSelector(
//   selectYearState,
//   fromExample.selectAllYear
// );
// export const selectAllIndPayer = createSelector(
//   selectIndPayerState,
//   fromExample.selectAllIndPayer
// );
// export const selectAllComPayer = createSelector(
//   selectComPayerState,
//   fromExample.selectAllComPayer
// );
// export const selectAllPayee = createSelector(
//   selectPayeeState,
//   fromExample.selectAllPayee
// );
//   export const selectAllNotification = createSelector(selectNotificationState, fromExample.selectAllNotification);
//   export const selectAllTransaction = createSelector(selectTransactionState, fromExample.selectAllTransaction);
//   export const selectAllTask = createSelector(selectTaskState, fromExample.selectAllTask);
//   export const selectAllAdmin_Agent = createSelector(selectAdmin_AgentState, fromExample.selectAllAdmin_Agent);
//   export const selectAllUser = createSelector(selectUserState, fromExample.selectAllUser);
//   export const selectAllCoupon = createSelector(selectCouponState, fromExample.selectAllCoupon);
//   export const selectAllSpecial_Order = createSelector(selectSpecial_OrderState, fromExample.selectAllSpecial_Order);
