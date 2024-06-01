// transfer seconds to minutes:seconds format
export function Seconds2Time(time) {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// convert timestamp to date string
export function Timestamp2Date(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
