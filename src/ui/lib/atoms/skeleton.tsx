import { PropsWithChildren } from 'react';
import { ActivityIndicator } from 'react-native';

import { Suspensible } from '~/ui:lib/shared/interfaces';

/* -------------------------------------------------------------------------------------------------
 * SkeletonContent
 * -----------------------------------------------------------------------------------------------*/

interface SkeletonContentProps extends Suspensible {}

const SkeletonContent = ({
  loading,
  children,
  ...rest
}: PropsWithChildren<SkeletonContentProps>) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return children;
};

SkeletonContent.displayName = 'SkeletonContent';

/* -----------------------------------------------------------------------------------------------*/

export { SkeletonContent };
export type { SkeletonContentProps };
