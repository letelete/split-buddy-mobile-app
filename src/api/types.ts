import { Balance } from '~/utils/types';

export interface UserBalance {
  balances: Balance[];
}
export interface ExpenseGroup {
  id: string;
  balances: Balance[];
  members: ExpenseGroupMember[];
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ExpenseGroupMember {
  id: string;
  displayName: string;
  photoUrl?: string;
}
