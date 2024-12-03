export const getAmountLabel = (amount: string | number) => {
  if (amount === null || amount === undefined || isNaN(Number(amount)))
    return "";
  return `₹ ${Math.round(Number(amount)).toLocaleString("en-IN")}`;
};
