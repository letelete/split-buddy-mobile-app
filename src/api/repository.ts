import { faker } from '@faker-js/faker';

import { Balance, ExpenseGroup, ExpenseGroupMember, UserBalance, UserDetails } from '~/api/types';

export interface GetUserTotalBalanceParams {}

export async function getUserTotalBalance(
  params: GetUserTotalBalanceParams,
  options?: { signal?: AbortSignal }
): Promise<UserBalance> {
  await wait();

  const expensesGroups = await getExpensesGroups({});

  const total = mergeBalances(expensesGroups.flatMap((group) => group.userBalance.total));
  const borrowed = mergeBalances(expensesGroups.flatMap((group) => group.userBalance.borrowed));
  const lent = mergeBalances(expensesGroups.flatMap((group) => group.userBalance.lent));

  return { total, borrowed, lent };
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
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [],
          lent: [],
        },
      }),
    ]),
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [{ value: 199.68, currency: { code: 'USD', name: 'US Dollar' } }],
          lent: [
            { value: 10.42, currency: { code: 'PLN', name: 'Polish Zloty' } },
            { value: 12, currency: { code: 'EUR', name: 'Euro' } },
          ],
        },
      }),
    ]),
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [{ value: 200, currency: { code: 'PLN', name: 'Polish Zloty' } }],
          lent: [],
        },
      }),
      createFakeMember({
        userBalance: {
          borrowed: [{ value: 100, currency: { code: 'PLN', name: 'Polish Zloty' } }],
          lent: [{ value: 20, currency: { code: 'EUR', name: 'Euro' } }],
        },
      }),
      createFakeMember({
        userBalance: {
          borrowed: [
            { value: -233.12, currency: { code: 'PLN', name: 'Polish Zloty' } },
            { value: -24, currency: { code: 'USD', name: 'US Dollar' } },
            { value: -100.23, currency: { code: 'JPY', name: 'Japanese Yen' } },
          ],
          lent: [],
        },
      }),
      createFakeMember({
        userBalance: {
          borrowed: [],
          lent: [],
        },
      }),
    ]),
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [],
          lent: [{ value: 200, currency: { code: 'USD', name: 'US Dollar' } }],
        },
      }),
    ]),
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [],
          lent: [{ value: 12.76, currency: { code: 'USD', name: 'US Dollar' } }],
        },
      }),
    ]),
    createFakeGroup([
      createFakeMember({
        userBalance: {
          borrowed: [{ value: 12.76, currency: { code: 'USD', name: 'US Dollar' } }],
          lent: [],
        },
      }),
    ]),
  ];
}

// TODO:for mocking purposes
async function wait(delay: number = Math.floor(Math.random() * 3) + 1) {
  return await new Promise((r) => setTimeout(r, delay));
}

// TODO:for mocking purposes
function createFakeGroup(members: ExpenseGroupMember[]): ExpenseGroup {
  const total = mergeBalances(members.flatMap((member) => member.userBalance.total));
  const borrowed = mergeBalances(members.flatMap((member) => member.userBalance.borrowed));
  const lent = mergeBalances(members.flatMap((member) => member.userBalance.lent));

  const nameChunks = [faker.company.name(), faker.company.name(), faker.company.name()];
  const name = nameChunks.slice(0, Math.floor(Math.random() * nameChunks.length - 1) + 1).join(' ');

  const group = {
    id: faker.string.uuid(),
    name,
    members,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    userBalance: { total, borrowed, lent },
  };
  return group;
}

// TODO:for mocking purposes
function createFakeMember(
  data: Partial<Omit<ExpenseGroupMember, 'userBalance'>> & {
    userBalance: Omit<ExpenseGroupMember['userBalance'], 'total'>;
  }
): ExpenseGroupMember {
  return {
    id: faker.string.uuid(),
    displayName: faker.person.fullName(),
    imageUrl: faker.image.avatar(),
    ...data,
    userBalance: {
      ...data.userBalance,
      total: mergeBalances([
        ...data.userBalance.borrowed.map((balance) => ({ ...balance, value: -balance.value })),
        ...data.userBalance.lent,
      ]),
    },
  };
}

// TODO:for mocking purposes
function mergeBalances(balances: Balance[]): Balance[] {
  return Object.values(
    balances.reduce(
      (obj, next) => ({
        ...obj,
        [next.currency.code]: {
          ...next,
          value: (obj[next.currency.code]?.value ?? 0) + next.value,
        },
      }),
      {} as Record<string, Balance>
    )
  );
}
