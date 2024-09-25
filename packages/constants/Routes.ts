import { Roles } from './constants';

export type Routes =
  | '/login'
  | '/products' | '/' | '/dashboard'
  ;

export const PERMISSION_ROUTE: Record<Routes, Array<Roles>> = {
  "/login": [],
  "/products": [Roles.Admin],
  "/" : [],
  "/dashboard": [],
};

export const NAME_PAGE: Partial<Record<Routes, string>> = {
  "/products": 'Products'
};

export const NOT_SHOW_INPUT: Partial<Record<Routes, boolean>> = {};

export const SHOW_BUTTONBACK: Partial<Record<Routes, boolean>> = {};
