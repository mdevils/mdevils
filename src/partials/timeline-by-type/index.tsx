import * as React from 'react';
import styled from 'styled-components';
import memoizeOne from 'memoize-one';
import {Heading} from '../../components/heading';
import {TimelineItem} from '../../data/timeline';
import {filterNames, TimelineItemType} from '../timeline/const';
import {getTimelineDatesUncached} from '../timeline/get-timeline-dates';
import {getTimelineIndexUncached, TimelineItemsByEndDate} from '../timeline/get-timeline-index';
import {getTimelineLanedUncached} from '../timeline/get-timeline-laned';
import {TimelineItems} from '../timeline/timeline-items';

type TimelineGroupedByType = {[key in TimelineItemType]: TimelineItem[]};
type TimelineDataGroupedByType = {[key in TimelineItemType]: {
  dates: string[];
  index: TimelineItemsByEndDate;
}};

const groupTimelineByType = memoizeOne((timeline: TimelineItem[]) => {
  const itemsByType = {} as TimelineGroupedByType;
  for (let item of timeline) {
    itemsByType[item.type] = itemsByType[item.type] || [];
    itemsByType[item.type].push(item);
  }
  const result = {} as TimelineDataGroupedByType;
  for (let type of Object.keys(itemsByType) as TimelineItemType[]) {
    result[type] = {
      dates: getTimelineDatesUncached(itemsByType[type]),
      index: getTimelineIndexUncached(getTimelineLanedUncached(itemsByType[type]).items)
    };
  }
  return result;
});

const PrintLayer = styled.div`
    height: 100px;
    page-break-inside: avoid;
    width: 1px;
`;

const TimelineByTypeWrapper = styled.div`
  display: none;
  @media print {
    display: block;
  }
`;
const TimelineByTypeSectionWrapper = styled.section``;
const noop = () => null;

const HeadingWrapper = styled.div`
  margin: -95px 0 10px;
`;

export function TimelineByType({timeline}: {timeline: TimelineItem[]}) {
  const timelineByType = groupTimelineByType(timeline);
  return (
    <TimelineByTypeWrapper>
      {(Object.keys(timelineByType) as TimelineItemType[]).map((type) => (
        <TimelineByTypeSectionWrapper aria-labelledby={`print-section-${type}`} key={type}>
          <PrintLayer />
          <HeadingWrapper>
            <Heading>{filterNames[type]}</Heading>
          </HeadingWrapper>
          <TimelineItems
            dates={timelineByType[type].dates}
            index={timelineByType[type].index}
            hoveredId={null}
            onLeave={noop}
            onEnter={noop}
          />
        </TimelineByTypeSectionWrapper>
      ))}
    </TimelineByTypeWrapper>
  );
}
