export interface Currency {
  code: string;
  name: string;
}

export interface Balance {
  value: number;
  currency: Currency;
}

export interface UserDetails {
  displayName: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export interface UserBalance {
  total: Balance[];
  borrowed: Balance[];
  lent: Balance[];
}

export interface ExpenseGroup {
  id: string;
  userBalance: UserBalance;
  members: ExpenseGroupMember[];
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ExpenseGroupDetails {
  id: string;
  userBalance: UserBalance;
  members: ExpenseGroupMember[];
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface ExpenseGroupMember {
  id: string;
  displayName: string;
  imageUrl?: string;
  userBalance: UserBalance;
}
