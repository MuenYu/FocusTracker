export function statistic(records) {
  if (records.length === 0) return null;
  const data = {
    totalTime: 0,
    totalCount: records.length,
    longestFocus: 0,
    shortestFocus: Infinity,
    avgPeriod: 0,
  };
  for (const record of records) {
    data.totalTime += record.duration;
    data.longestFocus = Math.max(data.longestFocus, record.duration);
    data.shortestFocus = Math.min(data.shortestFocus, record.duration);
  }
  data.avgPeriod = Math.floor(data.totalTime / data.totalCount);
  return data;
}
