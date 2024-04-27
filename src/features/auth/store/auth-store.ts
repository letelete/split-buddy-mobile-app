import { useEffect, useState } from 'react';

// TODO:
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userSignedOut, setUserSignedOut] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    // const interval = setInterval(() => {
    //   setUserToken((x) => {
    //     const r = x ? null : 'lol';
    //     setSignedOut(!r);
    //     return r;
    //   });
    // }, 4000);
    // return () => clearInterval(interval);
  }, []);

  return { isLoading, userToken, userSignedOut };
};
