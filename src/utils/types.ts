export interface Currency {
  code: string;
  name: string;
}

export interface Balance {
  value: number;
  currency: Currency;
}

export type CompareFn<T> = (a: T, b: T) => number;
