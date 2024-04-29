import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useRefetchOnReconnectToNetwork = () => {
  useEffect(() => {
    const unsubscribe = onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(Boolean(state.isConnected));
      });
    });

    return unsubscribe;
  }, []);
};
