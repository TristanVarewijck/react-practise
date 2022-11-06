// to => yy/mm/dd
export const parseDate = (newDate) => {
  const yYmMdDFormat = newDate.toISOString().slice(0, 10).replaceAll("-", "/");
  return yYmMdDFormat;
};
