export const calculatePerformance = (start, finish) =>
  ((finish / start - 1) * 100).toFixed(2);
