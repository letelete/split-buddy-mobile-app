import { StackActions, createNavigationContainerRef } from '@react-navigation/native';

import { MainStackParamList } from '~/router/types';

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate(name: string, params = {}) {
  navigationRef.current?.dispatch(StackActions.popToTop());
  navigationRef.current?.navigate(name, params);
}
