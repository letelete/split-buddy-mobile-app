import {
  LinearGradient as ExpoLinearGradient,
  type LinearGradientProps as ExpoLinearGradientProps,
} from 'expo-linear-gradient';
import { PropsWithChildren, useMemo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Stylable } from '~/ui:lib/shared/interfaces';

const gradientHorizontalProps = {
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
} as const;

const gradientVerticalProps = {
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 1 },
} as const;

interface WithAbsolutePositioning {
  fill?: boolean;
}

interface WithDirection {
  direction?: 'vertical' | 'horizontal';
}

const useGradientDirection = (direction: NonNullable<WithDirection['direction']>) => {
  const props = useMemo(
    () =>
      (
        ({
          horizontal: gradientHorizontalProps,
          vertical: gradientVerticalProps,
        }) satisfies Record<
          NonNullable<WithDirection['direction']>,
          Partial<ExpoLinearGradientProps>
        >
      )[direction],
    [direction]
  );

  return props;
};

interface BaseLinearGradientProps
  extends ExpoLinearGradientProps,
    WithAbsolutePositioning,
    WithDirection,
    Stylable {}

const BaseLinearGradient = ({
  children,
  fill,
  direction = 'horizontal',
  containerStyle,
  ...rest
}: PropsWithChildren<BaseLinearGradientProps>) => {
  const { styles } = useStyles(stylesheet);
  const directionProps = useGradientDirection(direction);

  return (
    <ExpoLinearGradient {...rest} {...directionProps} style={[fill && styles.fill, containerStyle]}>
      {children}
    </ExpoLinearGradient>
  );
};

BaseLinearGradient.displayName = 'BaseLinearGradient';

export interface NeutralGradientProps extends Partial<BaseLinearGradientProps> {}

const NeutralGradient = ({ children, ...rest }: PropsWithChildren<NeutralGradientProps>) => {
  const { theme } = useStyles(stylesheet);

  return (
    <BaseLinearGradient {...rest} colors={theme.gradients.neutral.values}>
      {children}
    </BaseLinearGradient>
  );
};

NeutralGradient.displayName = 'NeutralGradient';

export interface PositiveGradientProps extends Partial<BaseLinearGradientProps> {}

const PositiveGradient = ({ children, ...rest }: PropsWithChildren<PositiveGradientProps>) => {
  const { theme } = useStyles(stylesheet);

  return (
    <BaseLinearGradient {...rest} colors={theme.gradients.positive.values}>
      {children}
    </BaseLinearGradient>
  );
};

PositiveGradient.displayName = 'PositiveGradient';

export interface NegativeGradientProps extends Partial<BaseLinearGradientProps> {}

const NegativeGradient = ({ children, ...rest }: PropsWithChildren<NegativeGradientProps>) => {
  const { theme } = useStyles(stylesheet);

  return (
    <BaseLinearGradient {...rest} colors={theme.gradients.negative.values}>
      {children}
    </BaseLinearGradient>
  );
};

NegativeGradient.displayName = 'NegativeGradient';

export interface IOSGradientProps extends Partial<BaseLinearGradientProps> {}

const IOSGradient = ({ children, ...rest }: PropsWithChildren<NegativeGradientProps>) => {
  const { theme } = useStyles(stylesheet);

  return (
    <BaseLinearGradient {...rest} colors={theme.gradients.ios.values}>
      {children}
    </BaseLinearGradient>
  );
};

IOSGradient.displayName = 'IOSGradient';

const stylesheet = createStyleSheet({
  fill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export const LinearGradient = Object.assign(BaseLinearGradient, {
  Neutral: NeutralGradient,
  Positive: PositiveGradient,
  Negative: NegativeGradient,
  IOS: IOSGradient,
});

export type LinearGradientProps = BaseLinearGradientProps;
