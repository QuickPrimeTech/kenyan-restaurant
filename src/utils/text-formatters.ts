export const truncate = (str: string, length = 160) =>
  str.length > length ? str.slice(0, length - 3) + "..." : str;
