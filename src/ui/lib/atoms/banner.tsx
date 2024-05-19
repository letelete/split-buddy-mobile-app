import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { LinearGradient } from '~/ui:lib/atoms/gradient';
import { Background, BackgroundAwareContextProvider } from '~/ui:lib/shared/background-aware';
import { Stylable } from '~/ui:lib/shared/interfaces';

/* -------------------------------------------------------------------------------------------------
 * Banner
 * -----------------------------------------------------------------------------------------------*/

type BannerVariant = 'neutral' | 'positive' | 'negative';

interface BannerProps extends Stylable {
  variant?: BannerVariant;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Banner = ({
  variant = 'neutral',
  containerStyle,
  contentContainerStyle,
  children,
}: PropsWithChildren<BannerProps>) => {
  const { styles } = useStyles(stylesheet);

  const Gradient = useMemo(
    () =>
      (
        ({
          neutral: <LinearGradient.Neutral containerStyle={styles.gradient} fill />,
          positive: <LinearGradient.Positive containerStyle={styles.gradient} fill />,
          negative: <LinearGradient.Negative containerStyle={styles.gradient} fill />,
        }) satisfies Record<BannerVariant, ReactNode>
      )[variant],
    [styles.gradient, variant]
  );

  const background = useMemo(
    () =>
      (
        ({
          neutral: 'gradient-neutral',
          positive: 'gradient-positive',
          negative: 'gradient-negative',
        }) as Record<BannerVariant, Background>
      )[variant],
    [variant]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {Gradient}

      <BackgroundAwareContextProvider value={{ background }}>
        <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
      </BackgroundAwareContextProvider>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    borderRadius: theme.rounded.base,
  },
  gradient: {
    borderRadius: theme.rounded.base,
  },
  contentContainer: {
    padding: theme.margins.lg,
    alignItems: 'center',
  },
}));

Banner.displayName = 'Banner';

/* -----------------------------------------------------------------------------------------------*/

export { Banner };
export type { BannerVariant, BannerProps };
