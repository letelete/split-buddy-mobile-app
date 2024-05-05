import { faker } from '@faker-js/faker';

import { Balance, ExpenseGroup, UserBalance, UserDetails } from '~/api/types';

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

  const expensesGroups = await getExpensesGroups({});
  const balances = Object.values(
    expensesGroups
      .flatMap((g) => g.balances)
      .reduce(
        (obj, next) => ({
          ...obj,
          [next.currency.code]: {
            borrowed: {
              ...next,
              value: (obj[next.currency.code]?.borrowed.value ?? 0) - Math.min(next.value, 0),
            },
            lent: {
              ...next,
              value: (obj[next.currency.code]?.lent.value ?? 0) + Math.max(next.value, 0),
            },
            total: { ...next, value: (obj[next.currency.code]?.total.value ?? 0) + next.value },
          },
        }),
        {} as Record<string, { borrowed: Balance; lent: Balance; total: Balance }>
      )
  ).reduce(
    (obj, next) => ({
      borrowed: [...obj.borrowed, next.borrowed],
      lent: [...obj.lent, next.lent],
      balances: [...obj.balances, next.total],
    }),
    {
      borrowed: [],
      lent: [],
      balances: [],
    } as UserBalance
  );

  return balances;
}

export interface GetUserDetailsParams {}

export async function getUserDetails(
  params: GetUserDetailsParams,
  options?: { signal?: AbortSignal }
): Promise<UserDetails> {
  await wait();
  const sexType = faker.person.sexType();
  const firstName = faker.person.firstName(sexType);
  const lastName = faker.person.lastName(sexType);

  return {
    displayName: `${firstName} ${lastName}`,
    firstName,
    lastName,
    imageUrl: faker.image.avatar(),
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
          imageUrl: faker.image.avatar(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [],
    },
    {
      id: faker.string.uuid(),
      name:
        faker.company.name() +
        ': ' +
        faker.company.catchPhrase() +
        ' + ' +
        faker.company.catchPhrase(),
      members: [
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [
        { value: -199.68, currency: { code: 'USD', name: 'US Dollar' } },
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
          imageUrl: faker.image.avatar(),
        },
        {
          id: faker.string.uuid(),
          displayName: faker.person.fullName(),
          imageUrl: faker.image.avatar(),
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
          imageUrl: faker.image.avatar(),
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
          imageUrl: faker.image.avatar(),
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: -12.76, currency: { code: 'USD', name: 'US Dollar' } }],
    },
  ];
}
