export function totalFocusTime(records) {
  return records.reduce((sum, item) => sum + item.duration, 0);
}

export function longestFocus(records) {
  return records.reduce((max, item) => Math.max(max, item.duration), 0);
}

export function shortestFocus(records) {
  return records.reduce((min, item) => Math.min(min, item.duration), Infinity);
}

export function avgFocusTime(records) {
  if (records.length === 0) return 0;
  return totalFocusTime(records) / records.length;
}
