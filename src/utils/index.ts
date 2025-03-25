export const getCountryName = (code: string): string | undefined => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};
