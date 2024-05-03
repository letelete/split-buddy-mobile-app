import { Balance } from '~/utils/types';

export interface UserBalance {
  balances: Balance[];
}
export interface ExpenseGroup {
  id: number;
  balances: Balance[];
  members: ExpenseGroupMember[];
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ExpenseGroupMember {
  id: number;
  displayName: string;
  photoUrl?: string;
}
