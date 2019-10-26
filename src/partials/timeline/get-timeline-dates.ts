import memoizeOne from 'memoize-one';
import {compareDateDesc, TimelineItem} from '../../data/timeline';

function uniq(arr: string[]): string[] {
  const index: {[key: string]: boolean} = {};
  for (let item of arr) {
    index[item] = true;
  }
  return Object.keys(index);
}

export const getTimelineDates = memoizeOne((timeline: TimelineItem[]) => {
  const result: string[] = [];
  for (let item of timeline) {
    result.push(item.to);
    if (item.from) {
      result.push(item.from);
    }
  }
  return uniq(result).sort(compareDateDesc);
});
