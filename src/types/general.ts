import { ReactNode } from 'react';

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type Option<T extends number | string = any> = {
  label: number | string;
  value: number | string | T;
  phone?: string;
};

export type BooleanStatus = 0 | 1;

export type VoidFunc = () => void;

export type StateResponse<T> = {
  loading: boolean;
  error: any;
  data: T | null;
};

export type ExtractType<T, P extends string = any> = Extract<T, P>;

export type PaginationType = {
  limit: number;
  page: number;
  total: number;
};

export type TableConfigs = {
  titles?: string[] | ReactNode[] | { title: string; sort: boolean; nameSort?: string }[];
  formats?: string[];
  sizes?: number[];
  shows?: boolean[];
};

export interface ICommon {
  id: string | number;
  code: string,
  createdAt: string;
  updatedAt: string;
}
