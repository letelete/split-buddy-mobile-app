import { withLenses } from '@dhmk/zustand-lens';
import { create } from 'zustand';

export const useAppStore = create(withLenses({}));
