import memoizeOne from 'memoize-one';
import {TimelineItemLaned} from './const';


export type TimelineItemsByEndDate = {[k: string]: TimelineItemLaned[]};

export const getTimelineIndex = memoizeOne((timeline: TimelineItemLaned[]): TimelineItemsByEndDate => {
  const result: TimelineItemsByEndDate = {};
  for (let item of timeline) {
    result[item.to] = result[item.to] || [];
    result[item.to].push(item);
  }
  return result;
});
