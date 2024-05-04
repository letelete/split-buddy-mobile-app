import { faker } from '@faker-js/faker';

import { ExpenseGroup, UserBalance } from '~/api/types';

// TODO:for mocking purposes
const wait = async (delay: number = Math.floor(Math.random() * 3) + 1) => {
  return await new Promise((r) => setTimeout(r, delay));
};

export interface GetUserTotalBalanceParams {}

export async function getUserTotalBalance(
  params: GetUserTotalBalanceParams,
  options?: { signal?: AbortSignal }
): Promise<UserBalance> {
  await wait();
  return {
    balances: [
      { value: -1999.68, currency: { code: 'USD', name: 'US Dollar' } },
      { value: 10.42, currency: { code: 'PLN', name: 'Polish Zloty' } },
      { value: 12, currency: { code: 'EUR', name: 'Euro' } },
    ],
  };
}

export interface GetExpensesGroupsParams {}

export async function getExpensesGroups(
  params: GetExpensesGroupsParams,
  options?: { signal?: AbortSignal }
): Promise<ExpenseGroup[]> {
  await wait();
  return [
    {
      id: faker.string.uuid(),
      name: faker.company.name(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [
        { value: -1999.68, currency: { code: 'USD', name: 'US Dollar' } },
        { value: 10.42, currency: { code: 'PLN', name: 'Polish Zloty' } },
        { value: 12, currency: { code: 'EUR', name: 'Euro' } },
      ],
    },
    {
      id: faker.string.uuid(),
      name: faker.company.name(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
          photoUrl: faker.image.avatar(),
        },
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
          photoUrl: faker.image.avatar(),
        },
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
        },
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [
        { value: 433.12, currency: { code: 'PLN', name: 'Polish Zloty' } },
        { value: 20, currency: { code: 'EUR', name: 'Euro' } },
        { value: -24, currency: { code: 'USD', name: 'US Dollar' } },
        { value: -100.23, currency: { code: 'JPY', name: 'Japanese Yen' } },
      ],
    },
    {
      id: faker.string.uuid(),
      name: faker.company.name(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: 200, currency: { code: 'USD', name: 'US Dollar' } }],
    },
    {
      id: faker.string.uuid(),
      name: faker.company.name(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
          photoUrl: faker.image.avatar(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: 12.76, currency: { code: 'USD', name: 'US Dollar' } }],
    },
    {
      id: faker.string.uuid(),
      name: faker.company.name(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
          photoUrl: faker.image.avatar(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: -12.76, currency: { code: 'USD', name: 'US Dollar' } }],
    },
  ];
}
