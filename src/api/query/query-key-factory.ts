const keys = {
  all: ['app'] as const,

  user: () => [...keys.all, 'user'] as const,
  userTotalBalance: () => [...keys.user(), 'total-balance'] as const,

  expensesGroups: () => [...keys.all, 'expenses-groups'] as const,
} as const;

export const queryKeyFactory = { ...keys };
