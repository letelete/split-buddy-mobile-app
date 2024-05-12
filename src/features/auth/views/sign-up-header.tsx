import { AppHeader } from '~/ui:lib/widgets/app-header';

export interface SignUpHeaderProps {}

const SignUpHeader = () => {
  return <AppHeader title='Split, Buddy' />;
};

SignUpHeader.displayName = 'SignUpHeader';

export { SignUpHeader };
