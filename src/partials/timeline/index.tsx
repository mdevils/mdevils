import memoizeOne from 'memoize-one';
import {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Filters} from '../../components/filters';
import * as React from 'react';
import {TimelineItem} from '../../data/timeline';
import {Filter, filterColors, filterNames} from './const';
import {getTimelineDates} from './get-timeline-dates';
import {getTimelineIndex} from './get-timeline-index';
import {getTimelineLaned} from './get-timeline-laned';
import {TimelineLanes} from './timeline-lanes';
import {TimelineItems} from './timeline-items';

const filterTimeline = memoizeOne((timeline: TimelineItem[], filter: Filter) => {
  return timeline.filter(({type}) => filter[type]);
});

export function Timeline({timeline}: {timeline: TimelineItem[]}) {
  const [filterStatuses, setStatuses] = useState<Filter>({
    public: true,
    work: true,
    education: true,
    openSource: true
  });

  return (
    <>
      <Filters
        colors={filterColors}
        names={filterNames}
        statuses={filterStatuses}
        onStatusesChange={setStatuses as any}
      />
      <TimelineContents timeline={filterTimeline(timeline, filterStatuses)} />
    </>
  )
}

const TimelineContentsWrapper = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  padding-left: 50px;
`;


function TimelineContents({timeline}: {timeline: TimelineItem[]}) {
  const dates = getTimelineDates(timeline);
  const {lanes, items} = getTimelineLaned(timeline);
  const index = getTimelineIndex(items);
  const [resolution, setResolution] = useState(window.innerWidth * timeline.length);
  useEffect(() => {
    function onResize() {
      setResolution(window.innerWidth * timeline.length);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [timeline]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const onEnter = useCallback((id: string) => {
    setHoveredId(id);
  }, []);
  const onLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  return (
    <TimelineContentsWrapper>
      <TimelineLanes
        lanes={lanes}
        resolution={resolution}
        onEnter={onEnter}
        onLeave={onLeave}
        hoveredId={hoveredId}
      />
      <TimelineItems
        dates={dates}
        index={index}
        onEnter={onEnter}
        onLeave={onLeave}
        hoveredId={hoveredId}
      />
    </TimelineContentsWrapper>
  )
}
