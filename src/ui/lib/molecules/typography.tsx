import { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

export interface WithDynamicPadding {
  disablePadding?: boolean;
}

export interface LargeTitleProps extends WithDynamicPadding, TextProps {}

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
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.lg }, containerStyle]}
      size='lg'
      weight='bold'
    >
      {children}
    </Text>
  );
};

LargeTitle.displayName = 'LargeTitle';

export type SectionTitleSpacingTop = 'none' | 'large' | 'base';

export interface SectionTitleProps extends WithDynamicPadding, TextProps {
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
      containerStyle={[
        !disablePadding && { paddingBottom: theme.margins.lg },
        styles.container,
        containerStyle,
      ]}
      color='primary'
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

export interface BodyProps extends WithDynamicPadding, TextProps {}

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
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.md }, containerStyle]}
    >
      {children}
    </Text>
  );
};

Body.displayName = 'Body';

export interface ErrorBodyProps extends WithDynamicPadding, TextProps {}

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
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.base }, containerStyle]}
    >
      {children}
    </Text>
  );
};

ErrorBody.displayName = 'ErrorBody';

export interface CaptionProps extends WithDynamicPadding, TextProps {}

const Caption = ({
  containerStyle,
  disablePadding,
  color = 'secondary',
  children,
  ...rest
}: PropsWithChildren<CaptionProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      color={color}
      containerStyle={[!disablePadding && { paddingBottom: theme.margins.sm }, containerStyle]}
      size='xs'
    >
      {children}
    </Text>
  );
};

Caption.displayName = 'Caption';

export const Typography = {
  LargeTitle,
  SectionTitle,
  Body,
  ErrorBody,
  Caption,
};
