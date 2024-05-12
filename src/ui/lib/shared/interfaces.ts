import { StyleProp, ViewStyle } from 'react-native';

export interface Stylable<T = ViewStyle> {
  containerStyle?: StyleProp<T>;
}

export interface Suspensible {
  loading?: boolean;
}
