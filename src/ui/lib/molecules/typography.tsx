import { PropsWithChildren } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { StylesheetVariants } from '~/ui:lib/shared/stylesheet';

interface WithDynamicPadding {
  disablePadding?: boolean;
  paddingBottom?: number;
}

/* -------------------------------------------------------------------------------------------------
 * LargeTitle
 * -----------------------------------------------------------------------------------------------*/

interface LargeTitleProps extends WithDynamicPadding, TextProps {}

const LargeTitle = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  children,
  ...rest
}: PropsWithChildren<LargeTitleProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.lg },
        containerStyle,
      ]}
      color='primarySoft'
      size='lg'
      weight='bold'
    >
      {children}
    </Text>
  );
};

LargeTitle.displayName = 'LargeTitle';

/* -------------------------------------------------------------------------------------------------
 * SectionTitle
 * -----------------------------------------------------------------------------------------------*/

export type SectionTitleSpacingTop = 'none' | 'large' | 'base';

interface SectionTitleProps extends WithDynamicPadding, TextProps {
  spacingTop?: SectionTitleSpacingTop;
}

const SectionTitle = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  spacingTop = 'base',
  children,
  ...rest
}: PropsWithChildren<SectionTitleProps>) => {
  const { theme, styles } = useStyles(stylesheet, { spacingTop });

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.lg },
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
    marginLeft: theme.margins.base,
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

/* -------------------------------------------------------------------------------------------------
 * Body
 * -----------------------------------------------------------------------------------------------*/

interface BodyProps extends WithDynamicPadding, TextProps {}

const Body = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  color = 'primarySoft',
  children,
  ...rest
}: PropsWithChildren<BodyProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.md },
        containerStyle,
      ]}
      color={color}
    >
      {children}
    </Text>
  );
};

Body.displayName = 'Body';

/* -------------------------------------------------------------------------------------------------
 * ErrorBody
 * -----------------------------------------------------------------------------------------------*/

interface ErrorBodyProps extends WithDynamicPadding, TextProps {}

const ErrorBody = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  children,
  ...rest
}: PropsWithChildren<ErrorBodyProps>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.base },
        containerStyle,
      ]}
      color='destructive'
    >
      {children}
    </Text>
  );
};

ErrorBody.displayName = 'ErrorBody';

/* -------------------------------------------------------------------------------------------------
 * Caption1
 * -----------------------------------------------------------------------------------------------*/

interface Caption1Props extends WithDynamicPadding, TextProps {}

const Caption1 = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  color = 'secondary',
  children,
  ...rest
}: PropsWithChildren<Caption1Props>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.sm },
        containerStyle,
      ]}
      color={color}
      size='sm'
    >
      {children}
    </Text>
  );
};

Caption1.displayName = 'Caption1';

/* -------------------------------------------------------------------------------------------------
 * Caption2
 * -----------------------------------------------------------------------------------------------*/

interface Caption2Props extends WithDynamicPadding, TextProps {}

const Caption2 = ({
  containerStyle,
  disablePadding,
  paddingBottom,
  color = 'secondary',
  children,
  ...rest
}: PropsWithChildren<Caption2Props>) => {
  const { theme } = useStyles();

  return (
    <Text
      {...rest}
      containerStyle={[
        !disablePadding && { paddingBottom: paddingBottom ?? theme.margins.sm },
        containerStyle,
      ]}
      color={color}
      size='xs'
    >
      {children}
    </Text>
  );
};

Caption2.displayName = 'Caption2';

/* -----------------------------------------------------------------------------------------------*/

const Typography = {
  LargeTitle,
  SectionTitle,
  Body,
  ErrorBody,
  Caption1,
  Caption2,
};

export { Typography };
export type {
  LargeTitleProps,
  SectionTitleProps,
  BodyProps,
  ErrorBodyProps,
  Caption1Props,
  Caption2Props,
};
