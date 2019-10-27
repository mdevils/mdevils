function pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function dateToMonths(date: string): number {
  const [year, month] = date.split('-').map((s) => parseInt(s, 10));
  return year * 12 + month;
}

function monthsToDate(months: number): string {
  return `${Math.floor(months / 12)}-${pad(months % 12)}`;
}

function inflect(num: number, singular: string, plural: string) {
  if (num === 1) {
    return singular;
  }
  return plural;
}

export function getDurationInMonths(from: string, to: string) {
  return dateToMonths(to) - dateToMonths(from) + 1;
}

export function getMonthsFromRange(from: string, to: string): string[] {
  const result: string[] = [];
  const fromMonths = dateToMonths(from);
  const toMonths = dateToMonths(to);
  for (let i = fromMonths; i <= toMonths; i++) {
    result.push(monthsToDate(i));
  }
  return result;
}

export function formatDuration(duration: number, includeMonths = true) {
  let result: string[] = [];
  if (duration >= 12) {
    const years = Math.floor(duration / 12);
    result.push(`${years} ${inflect(years, 'year', 'years')}`);
    duration = duration % 12;
  }
  if (duration > 0 && includeMonths) {
    result.push(`${duration} ${inflect(duration, 'month', 'months')}`);
  }
  return result.join(', ');
}
