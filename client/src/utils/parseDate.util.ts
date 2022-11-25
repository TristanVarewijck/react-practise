// to => yy/mm/dd
export const parseDate = (newDate: Date): string => {
  const formattedDate =
    ("0" + newDate.getDate()).slice(-2) +
    " / " +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    " / " +
    newDate.getFullYear();

  // ("0" + newDate.getHours()).slice(-2) +
  // ("0" + newDate.getMinutes()).slice(-2);

  return formattedDate;
};
