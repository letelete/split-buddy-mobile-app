import {
  ParamListBase,
  RouteProp,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import { MainStackParamList } from '~/router/main-navigator/main-navigator';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string,
> {
  navigation: StackNavigationProps<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate(name: string, params = {}) {
  navigationRef.current?.dispatch(StackActions.popToTop());
  navigationRef.current?.navigate(name, params);
}
