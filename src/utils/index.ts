export const addPrefix = (num: number) =>
  num?.toLocaleString('en', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 18,
  }) + 'f';

export const removeExt = (fileName: string) =>
  fileName.split('.').slice(0, -1).join('.');
