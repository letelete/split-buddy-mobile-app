import { AppHeader } from '~/ui:lib/widgets/app-header';

/* -------------------------------------------------------------------------------------------------
 * SignUpHeader
 * -----------------------------------------------------------------------------------------------*/

interface SignUpHeaderProps {}

const SignUpHeader = () => {
  return <AppHeader title='Split, Buddy' />;
};

SignUpHeader.displayName = 'SignUpHeader';

/* -----------------------------------------------------------------------------------------------*/

export { SignUpHeader };
export type { SignUpHeaderProps };
