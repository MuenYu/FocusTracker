/**
 * all statistics business logic
 */

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

export function ranking(records) {
  const map = {};
  for (const record of records) {
    map[record.task] = (map[record.task] ?? 0) + record.duration;
  }
  const list = Object.entries(map).map(([task, duration]) => ({
    task,
    duration,
  }));
  return list.sort((a, b) => b.duration - a.duration);
}
