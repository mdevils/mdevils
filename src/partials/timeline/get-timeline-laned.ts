import memoizeOne from 'memoize-one';
import {TimelineItem} from '../../data/timeline';
import {Lanes, TimelineItemLaned} from './const';


function isInRange(point: string, range: {from: string, to: string}) {
  return point > range.from && point < range.to;
}

function isIntersecting(a: {from: string, to: string}, b: {from: string, to: string}) {
  return isInRange(a.from, b) || isInRange(a.to, b) || isInRange(b.from, a) || isInRange(b.to, a);
}

export const getTimelineLanedUncached = (timeline: TimelineItem[]): {
  items: TimelineItemLaned[],
  lanes: Lanes
} => {
  const lanes: Lanes = [];
  const items: TimelineItemLaned[] = [];
  for (let item of timeline) {
    let found = false;
    const {id, type, to, from = to} = item;
    const point = {from, to};
    if (from === to) {
      items.push({...item, from, to, lane: -1});
      continue;
    }
    for (let i = 0; i < lanes.length; i++) {
      if (found) {
        break;
      }
      const lane = lanes[i];
      let intersects = false;
      for (let li of lane) {
        if (found || intersects) {
          break;
        }

        if (isIntersecting(point, li)) {
          intersects = true;
          break;
        }
      }
      if (!intersects) {
        items.push({...item, from: from, to: to, lane: i});
        lane.push({from, to, type, id});
        found = true;
      }
    }
    if (!found) {
      lanes.push([{from, to, type, id}]);
      items.push({...item, from: from, to: to, lane: lanes.length - 1});
    }
  }
  lanes.reverse();
  return {items, lanes};
};

export const getTimelineLaned = memoizeOne(getTimelineLanedUncached);
