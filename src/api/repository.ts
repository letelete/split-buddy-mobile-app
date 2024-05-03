import { ExpenseGroup, UserBalance } from '~/api/types';

// TODO:for mocking purposes
const wait = async (delay: number = Math.floor(Math.random() * 3)) => {
  return await new Promise((r) => setTimeout(r, delay));
};

function* createIdGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
  // eslint-disable-next-line no-unreachable
  return id;
}

const idGen = createIdGenerator();

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
      id: idGen.next().value,
      name: 'Sesame Street',
      members: [
        {
          id: idGen.next().value,
          displayName: 'Emilia Lis',
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
      id: idGen.next().value,
      name: 'Upsidelab',
      members: [
        {
          id: idGen.next().value,
          displayName: 'John Doe',
        },
        {
          id: idGen.next().value,
          displayName: 'Kate Upton',
        },
        {
          id: idGen.next().value,
          displayName: 'Sam Lee',
        },
        {
          id: idGen.next().value,
          displayName: 'Ophelia Olly',
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
      id: idGen.next().value,
      name: 'Kate & Bruno',
      members: [
        {
          id: idGen.next().value,
          displayName: 'Kate Upton',
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: 200, currency: { code: 'USD', name: 'US Dollar' } }],
    },
    {
      id: idGen.next().value,
      name: 'Italy trip 2024',
      members: [
        {
          id: idGen.next().value,
          displayName: 'John Doe',
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: 12.76, currency: { code: 'USD', name: 'US Dollar' } }],
    },
    {
      id: idGen.next().value,
      name: 'Berlin conference',
      members: [
        {
          id: idGen.next().value,
          displayName: 'Karol S.',
        },
      ],
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      balances: [{ value: -12.76, currency: { code: 'USD', name: 'US Dollar' } }],
    },
  ];
}
