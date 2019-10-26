import {TimelineItem} from '../../data/timeline';

export type TimelineItemType = TimelineItem['type'];
export type Filter = Record<TimelineItemType, boolean>;
export type Names = Record<TimelineItemType, string>;
export type Colors = Record<TimelineItemType, string>;
export type TimelineItemLaned = TimelineItem & {lane: number};
export type Lanes = {from: string, to: string, type: TimelineItemType, id: string}[][];

export const timelineBarWidth = 8;
export const timelineBarMargin = 2;
export const timelineBarSpacer = 5;
export const timelineGridLineColor = '#ccc';

export const filterNames: Names = {
  work: 'Experience',
  education: 'Education',
  public: 'Publications',
  openSource: 'Open Source'
};

export const filterColors: Colors = {
  work: '#428559',
  education: '#295884',
  public: '#8A3621',
  openSource: '#880'
};

