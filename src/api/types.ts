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
  balances: Balance[];
  borrowed: Balance[];
  lent: Balance[];
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
  imageUrl?: string;
}
