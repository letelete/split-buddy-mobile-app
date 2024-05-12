import { AppHeader } from '~/ui:lib/widgets/app-header';
import { NotificationsButton } from '~/ui:lib/widgets/notifications-button';
import { ProfileButton } from '~/ui:lib/widgets/profile-button';

export interface HomeHeaderProps {}

const HomeHeader = () => {
  return (
    <AppHeader left={<ProfileButton />} right={<NotificationsButton />} title='Split, Buddy' />
  );
};

HomeHeader.displayName = 'HomeHeader';

export { HomeHeader };
