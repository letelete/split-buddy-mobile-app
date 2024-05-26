import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';

export type HapticType = 'modal-open';

interface HapticRunner {
  triggerAsync(): Promise<void>;
}

const typeToHapticRunner: Record<HapticType, HapticRunner> = {
  'modal-open': {
    triggerAsync() {
      return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
  },
};

const useHaptic = (type: HapticType) => {
  const runner = useMemo(() => typeToHapticRunner[type], [type]);

  return runner;
};

useHaptic.displayName = 'useHaptic';

export { useHaptic };
