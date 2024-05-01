import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface WithAbsolutePositioning {
  fill?: boolean;
}

export interface NeutralGradientProps extends WithAbsolutePositioning {}

const NeutralGradient = ({ children, fill }: PropsWithChildren<NeutralGradientProps>) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ExpoLinearGradient
      colors={theme.gradients.neutral as unknown as string[]}
      style={[fill && styles.fill]}
    >
      {children}
    </ExpoLinearGradient>
  );
};

NeutralGradient.displayName = 'NeutralGradient';

export interface PositiveGradientProps extends WithAbsolutePositioning {}

const PositiveGradient = ({ children, fill }: PropsWithChildren<PositiveGradientProps>) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ExpoLinearGradient
      colors={theme.gradients.positive as unknown as string[]}
      style={[fill && styles.fill]}
    >
      {children}
    </ExpoLinearGradient>
  );
};

PositiveGradient.displayName = 'PositiveGradient';

export interface NegativeGradientProps extends WithAbsolutePositioning {}

const NegativeGradient = ({ children, fill }: PropsWithChildren<NegativeGradientProps>) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ExpoLinearGradient
      colors={theme.gradients.negative as unknown as string[]}
      style={[fill && styles.fill]}
    >
      {children}
    </ExpoLinearGradient>
  );
};

NegativeGradient.displayName = 'NegativeGradient';

const stylesheet = createStyleSheet({
  fill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export const LinearGradient = Object.assign({
  Neutral: NeutralGradient,
  Positive: PositiveGradient,
  Negative: NegativeGradient,
});
