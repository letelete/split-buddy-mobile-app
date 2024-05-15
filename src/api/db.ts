// TODO: for mocking purposes
import { faker } from '@faker-js/faker';

import { Balance, ExpenseGroup, ExpenseGroupMember, UserDetails } from '~/api/types';

export class DB {
  user = this.getUserDetails();
  expensesGroups = this.getExpensesGroups();

  getUserTotalBalance() {
    const total = mergeBalances(this.expensesGroups.flatMap((group) => group.userBalance.total));
    const borrowed = mergeBalances(
      this.expensesGroups.flatMap((group) => group.userBalance.borrowed)
    );
    const lent = mergeBalances(this.expensesGroups.flatMap((group) => group.userBalance.lent));

    return { total, borrowed, lent };
  }

  getExpenseGroupDetails(groupId: string) {
    const group = this.expensesGroups.find((group) => group.id === groupId);
    if (!group) {
      throw new Error(`Group with id ${groupId} not found.`);
    }
    return group;
  }

  private getUserDetails(): UserDetails {
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

  private getExpensesGroups(): ExpenseGroup[] {
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
        createFakeMember(
          {
            userBalance: {
              borrowed: [{ value: 100, currency: { code: 'PLN', name: 'Polish Zloty' } }],
              lent: [
                { value: 20, currency: { code: 'EUR', name: 'Euro' } },
                { value: 1999.99, currency: { code: 'USD', name: 'Euro' } },
              ],
            },
          },
          { avatar: false }
        ),
        createFakeMember(
          {
            userBalance: {
              borrowed: [
                { value: 233.12, currency: { code: 'PLN', name: 'Polish Zloty' } },
                { value: 24, currency: { code: 'USD', name: 'US Dollar' } },
                { value: 100.23, currency: { code: 'JPY', name: 'Japanese Yen' } },
                { value: 899.99, currency: { code: 'CFH', name: 'Swiss franc' } },
              ],
              lent: [],
            },
          },
          { avatar: false }
        ),
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
        createFakeMember(
          {
            userBalance: {
              borrowed: [],
              lent: [{ value: 12.76, currency: { code: 'USD', name: 'US Dollar' } }],
            },
          },
          { avatar: false }
        ),
      ]),
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
            borrowed: [{ value: 4, currency: { code: 'USD', name: 'US Dollar' } }],
            lent: [{ value: 23, currency: { code: 'PLN', name: 'PLN' } }],
          },
        }),
      ]),
    ];
  }
}

// TODO:for mocking purposes
function createFakeGroup(members: ExpenseGroupMember[]): ExpenseGroup {
  const total = mergeBalances(members.flatMap((member) => member.userBalance.total));
  const borrowed = mergeBalances(members.flatMap((member) => member.userBalance.borrowed));
  const lent = mergeBalances(members.flatMap((member) => member.userBalance.lent));

  const nameChunks = [faker.company.name(), faker.company.name(), faker.company.name()];
  const name = nameChunks.slice(0, Math.floor(Math.random() * nameChunks.length) + 1).join(' ');

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

interface FakeMemberOptions {
  avatar?: boolean;
}
// TODO:for mocking purposes
function createFakeMember(
  data: Partial<Omit<ExpenseGroupMember, 'userBalance'>> & {
    userBalance: Omit<ExpenseGroupMember['userBalance'], 'total'>;
  },
  { avatar = true }: FakeMemberOptions = {}
): ExpenseGroupMember {
  return {
    id: faker.string.uuid(),
    displayName: faker.person.fullName(),
    imageUrl: avatar ? faker.image.avatar() : undefined,
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
          value: safeAdd(obj[next.currency.code]?.value ?? 0, next.value),
        },
      }),
      {} as Record<string, Balance>
    )
  );
}

// TODO:for mocking purposes
function safeAdd(a: number, b: number) {
  return +(a + b).toFixed(12);
}
