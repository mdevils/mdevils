function dateToMonths(date: string): number {
  const [year, month] = date.split('-').map((s) => parseInt(s, 10));
  return year * 12 + month;
}

function inflect(num: number, singular: string, plural: string) {
  if (num === 1) {
    return singular;
  }
  return plural;
}

export function formatDuration(from: string, to: string) {
  let distance = dateToMonths(to) - dateToMonths(from);
  let result: string[] = [];
  if (distance >= 12) {
    const years = Math.floor(distance / 12);
    result.push(`${years} ${inflect(years, 'year', 'years')}`);
    distance = distance % 12;
  }
  if (distance > 0) {
    result.push(`${distance} ${inflect(distance, 'month', 'months')}`);
  }
  return result.join(', ');
}
