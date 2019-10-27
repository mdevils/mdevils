import memoizeOne from 'memoize-one';
import * as React from 'react';
import styled from 'styled-components';
import {showWorkInTimeline, TimelineItem} from '../../../data/timeline';
import {formatDuration, getMonthsFromRange} from '../format-duration';

type ExperienceByMonth = {[key: string]: {[key: string]: boolean}};
type ExperienceInMonths = {[key: string]: number};

const collectWorkExperience = memoizeOne((timeline: TimelineItem[]) => {
  const resultByMonth: ExperienceByMonth = {};
  for (let {work, from, to} of timeline.concat().reverse()) {
    if (work && from) {
      for (let area of work) {
        if (showWorkInTimeline[area]) {
          for (let date of getMonthsFromRange(from, to)) {
            resultByMonth[area] = (resultByMonth[area] || {});
            resultByMonth[area][date] = true;
          }
        }
      }
    }
  }
  const result: ExperienceInMonths = {};
  for (let area of Object.keys(resultByMonth)) {
    result[area] = Object.keys(resultByMonth[area]).length;
  }
  return result;
});

const collectPublicEvents = memoizeOne((timeline: TimelineItem[]) => {
  return timeline.filter(({type}) => type === 'public').length;
});

const collectOpenSource = memoizeOne((timeline: TimelineItem[]) => {
  return timeline.filter(({type}) => type === 'openSource').length;
});

const TimelineSummaryWrapper = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 480px;
`;
const TimelineSymmaryItem = styled.li`
  flex: 0 0 50%;
  min-width: 240px;
  font-size: 16px;
  margin-top: 6px;
`;
const TimelineSymmaryItemTerm = styled.span`
  margin-right: 6px;
`;
const TimelineSymmaryItemValue = styled.span`
  color: #555;
`;

export function TimelineSummary({timeline}: {timeline: TimelineItem[]}) {
  const experience = collectWorkExperience(timeline);
  const publicEvents = collectPublicEvents(timeline);
  const openSource = collectOpenSource(timeline);
  return (
    <TimelineSummaryWrapper>
      {Object.keys(experience).map((key) => (
        <TimelineSymmaryItem key={key}>
          <TimelineSymmaryItemTerm>{key}</TimelineSymmaryItemTerm>
          <TimelineSymmaryItemValue>{formatDuration(experience[key], false)}</TimelineSymmaryItemValue>
        </TimelineSymmaryItem>
      ))}
      {openSource > 0 && (
        <TimelineSymmaryItem key={'openSource'}>
          <TimelineSymmaryItemTerm>{openSource} OpenSoure projects</TimelineSymmaryItemTerm>
        </TimelineSymmaryItem>
      )}
      {publicEvents > 0 && (
        <TimelineSymmaryItem key={'public'}>
          <TimelineSymmaryItemTerm>{publicEvents} public talks</TimelineSymmaryItemTerm>
        </TimelineSymmaryItem>
      )}
    </TimelineSummaryWrapper>
  );
}
