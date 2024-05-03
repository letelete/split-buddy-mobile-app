import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

export interface Stylable<T = ViewStyle> {
  containerStyle?: StyleProp<T>;
}

export interface AnimatedStylable<T = ViewStyle> extends Stylable<AnimatedStyle<StyleProp<T>>> {}

export interface AnimatedStylableText<T = TextStyle>
  extends Stylable<AnimatedStyle<StyleProp<T>>> {}

export interface Suspensible {
  loading?: boolean;
}
