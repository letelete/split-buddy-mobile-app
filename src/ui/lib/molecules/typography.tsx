import { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { Stylable } from '~/ui:lib/shared/interfaces';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

export interface WithDynamicPadding {
  disablePadding?: boolean;
}

export interface LargeTitleProps extends WithDynamicPadding, Stylable, TextProps {}

const LargeTitle = ({
  containerStyle,
  disablePadding,
  children,
  ...rest
}: PropsWithChildren<LargeTitleProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      color='primarySoft'
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.lg }]}
      size='lg'
      weight='bold'
    >
      {children}
    </Text>
  );
};

LargeTitle.displayName = 'LargeTitle';

export type SectionTitleSpacingTop = 'none' | 'large' | 'base';

export interface SectionTitleProps extends WithDynamicPadding, Stylable, TextProps {
  spacingTop: SectionTitleSpacingTop;
}

const SectionTitle = ({
  containerStyle,
  disablePadding,
  spacingTop = 'base',
  children,
  ...rest
}: PropsWithChildren<SectionTitleProps>) => {
  const { theme, styles } = useStyles(stylesheet, { spacingTop });

  return (
    <Text
      {...rest}
      color='primary'
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.lg }, styles.container]}
      size='md'
      weight='bold'
    >
      {children}
    </Text>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    variants: {
      spacingTop: {
        none: { marginTop: 0 },
        base: { marginTop: theme.margins.lg },
        large: { marginTop: theme.margins.xxl },
      } satisfies StylesheetVariants<SectionTitleSpacingTop>,
    },
  },
}));

SectionTitle.displayName = 'SectionTitle';

export interface BodyProps extends WithDynamicPadding, Stylable, TextProps {}

const Body = ({
  containerStyle,
  disablePadding,
  color = 'primarySoft',
  children,
  ...rest
}: PropsWithChildren<BodyProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      color={color}
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.md }]}
    >
      {children}
    </Text>
  );
};

Body.displayName = 'Body';

export interface ErrorBodyProps extends WithDynamicPadding, Stylable, TextProps {}

const ErrorBody = ({
  containerStyle,
  disablePadding,
  children,
  ...rest
}: PropsWithChildren<ErrorBodyProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      color='destructive'
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.base }]}
    >
      {children}
    </Text>
  );
};

ErrorBody.displayName = 'ErrorBody';

export const Typography = Object.assign({
  LargeTitle,
  SectionTitle,
  Body,
  ErrorBody,
});
