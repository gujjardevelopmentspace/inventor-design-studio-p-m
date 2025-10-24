// Safe string utility functions to prevent null reference errors

export const safeReplace = (str: string | null | undefined, searchValue: string, replaceValue: string): string => {
  if (!str) return '';
  return str.replace(searchValue, replaceValue);
};

export const safeToLowerCase = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toLowerCase();
};

export const safeToUpperCase = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toUpperCase();
};

export const safeCharAt = (str: string | null | undefined, index: number): string => {
  if (!str || index < 0 || index >= str.length) return '';
  return str.charAt(index);
};

export const safeIncludes = (str: string | null | undefined, searchString: string): boolean => {
  if (!str || !searchString) return false;
  return str.includes(searchString);
};

export const safeSlice = (str: string | null | undefined, start: number, end?: number): string => {
  if (!str) return '';
  return str.slice(start, end);
};

export const safeLength = (str: string | null | undefined): number => {
  if (!str) return 0;
  return str.length;
};

// Safe array operations
export const safeArraySlice = <T>(arr: T[] | null | undefined, start: number, end?: number): T[] => {
  if (!arr) return [];
  return arr.slice(start, end);
};

export const safeArrayLength = <T>(arr: T[] | null | undefined): number => {
  if (!arr) return 0;
  return arr.length;
};

// Safe object property access
export const safeGetProperty = <T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined => {
  if (!obj) return undefined;
  return obj[key];
};

// Safe function to format user role
export const formatUserRole = (role: string | null | undefined): string => {
  if (!role) return 'User';
  return safeReplace(role, '_', ' ');
};

// Safe function to format permission
export const formatPermission = (permission: string | null | undefined): string => {
  if (!permission) return '';
  return safeToLowerCase(safeReplace(permission, '_', ' '));
};

// Safe function to get user initials
export const getUserInitials = (name: string | null | undefined): string => {
  if (!name) return 'U';
  const firstChar = safeCharAt(name, 0);
  return safeToUpperCase(firstChar) || 'U';
};

