import { PropsWithChildren } from 'react';
import { useStyles } from 'react-native-unistyles';

import { Text, TextProps } from '~/ui:lib/atoms/text';
import { Stylable } from '~/ui:lib/shared/interfaces';

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
  Body,
  ErrorBody,
});
