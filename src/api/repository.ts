import { DB } from '~/api/db';
import { ExpenseGroup, ExpenseGroupDetails, UserBalance, UserDetails } from '~/api/types';

const db = new DB();

export interface GetUserTotalBalanceParams {}

export async function getUserTotalBalance(
  params: GetUserTotalBalanceParams,
  options?: { signal?: AbortSignal }
): Promise<UserBalance> {
  await wait();

  return db.getUserTotalBalance();
}

export interface GetUserDetailsParams {}

export async function getUserDetails(
  params: GetUserDetailsParams,
  options?: { signal?: AbortSignal }
): Promise<UserDetails> {
  await wait();

  return db.user;
}

export interface GetExpensesGroupsParams {}

export async function getExpensesGroups(
  params: GetExpensesGroupsParams,
  options?: { signal?: AbortSignal }
): Promise<ExpenseGroup[]> {
  await wait();

  return db.expensesGroups;
}

export interface GetExpenseGroupDetailsParams {
  groupId: string;
}

export async function getExpenseGroupDetails(
  params: GetExpenseGroupDetailsParams,
  options?: { signal?: AbortSignal }
): Promise<ExpenseGroupDetails> {
  await wait();

  return db.getExpenseGroupDetails(params.groupId);
}

// TODO:for mocking purposes
async function wait(delay: number = Math.floor(Math.random() * 3) + 1) {
  return await new Promise((r) => setTimeout(r, delay));
}
