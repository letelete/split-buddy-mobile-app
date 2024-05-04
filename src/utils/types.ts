export interface Currency {
  code: string;
  name: string;
}

export interface Balance {
  value: number;
  currency: Currency;
}

export type CompareFn<T> = (a: T, b: T) => number;

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
