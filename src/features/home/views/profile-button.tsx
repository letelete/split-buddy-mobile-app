import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { useGetUserDetails } from '~/features/home/services/use-get-user-details';
import { useGetUserTotalBalance } from '~/features/home/services/use-get-user-total-balance';

import { SkeletonContent } from '~/ui:lib/atoms/skeleton';
import { UserAvatar } from '~/ui:lib/organisms/user-avatar';
import { Stylable } from '~/ui:lib/shared/interfaces';

export interface ProfileButtonProps extends Stylable {}

const ProfileButton = ({ containerStyle }: ProfileButtonProps) => {
  const userDetailsQuery = useGetUserDetails();

  const handleOpenProfile = useCallback(() => {
    console.warn('Not implemented');
  }, []);
  const totalBalanceQuery = useGetUserTotalBalance();

  return (
    <TouchableOpacity onPress={handleOpenProfile}>
      <SkeletonContent loading={userDetailsQuery.isLoading}>
        <UserAvatar
          balances={totalBalanceQuery.data?.balances ?? []}
          displayName={userDetailsQuery.data?.displayName ?? ''}
          imageUri={userDetailsQuery.data?.imageUrl}
        />
      </SkeletonContent>
    </TouchableOpacity>
  );
};

ProfileButton.displayName = 'ProfileButton';

export { ProfileButton };
