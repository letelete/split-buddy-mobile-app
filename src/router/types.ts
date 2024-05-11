import { ParamListBase } from '@react-navigation/native';

import { ExpenseGroupDetails } from '~/api/types';

export const AuthRoutes = {
  SIGN_UP: 'AuthSignUp',
} as const;

export interface AuthStackParamList extends ParamListBase {
  [AuthRoutes.SIGN_UP]: undefined;
}

export const MainRoutes = {
  HOME: 'Home',
  EXPENSE_GROUP: 'ExpenseGroup',
} as const;

export interface MainStackParamList extends ParamListBase {
  [MainRoutes.HOME]: undefined;
  [MainRoutes.EXPENSE_GROUP]: { groupId: string };
}

export const ExpenseGroupRoutes = {
  HOME: 'ExpenseGroupHome',
} as const;

export interface ExpenseGroupStackParamList extends ParamListBase {
  [ExpenseGroupRoutes.HOME]: { data: ExpenseGroupDetails };
}
