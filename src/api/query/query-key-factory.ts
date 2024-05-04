const keys = {
  all: ['app'] as const,

  user: () => [...keys.all, 'user'] as const,
  userTotalBalance: () => [...keys.user(), 'total-balance'] as const,
  userDetails: () => [...keys.user(), 'user-details'] as const,

  expensesGroups: () => [...keys.all, 'expenses-groups'] as const,
} as const;

export const queryKeyFactory = { ...keys };
