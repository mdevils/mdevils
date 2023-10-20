import {default as React, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {
  filterColors,
  Lanes,
  timelineBarMargin,
  timelineBarSpacer,
  timelineBarWidth,
  timelineGridLineColor,
  TimelineItemType
} from '../const';

const LaneBlockWrapper = styled.div<{type: TimelineItemType, hovered: boolean}>`
    position: absolute;
    background: ${({type}) => filterColors[type]};
    left: 0;
    right: 0;
    opacity: ${({hovered}) => hovered ? 1 : 0.5};
    z-index: 1;
`;

function getFromDivPos(fromDiv: HTMLDivElement) {
  return fromDiv.offsetTop + fromDiv.offsetHeight / 2 - timelineBarSpacer / 2;
}

function getToDivPos(toDiv: HTMLDivElement) {
  return toDiv.offsetTop + toDiv.offsetHeight / 2 + timelineBarSpacer / 2;
}

function LaneBlock({
  from,
  to,
  type,
  id,
  resolution,
  hovered,
  onEnter,
  onLeave
}: {
  from: string,
  to: string,
  type: TimelineItemType,
  id: string,
  resolution: number,
  hovered: boolean,
  onEnter: (id: string) => void,
  onLeave: () => void
}) {
  const div = useRef(null as null | HTMLDivElement);

  useEffect(() => {
    if (div.current) {
      const fromDiv = document.querySelector(`[data-date="${from}"]`) as HTMLDivElement;
      const toDiv = document.querySelector(`[data-date="${to}"]`) as HTMLDivElement;
      let fromPoint = getFromDivPos(fromDiv);
      let toPoint = getToDivPos(toDiv);
      if (fromDiv === toDiv) {
        toPoint -= timelineBarMargin * 1.5;
        fromPoint += timelineBarWidth * 1.5;
      }
      div.current.style.top = `${toPoint}px`;
      div.current.style.height = `${fromPoint - toPoint}px`;
    }
  }, [resolution, from, to]);

  const onMouseEnter = useCallback(() => {
    onEnter(id);
  }, [id, onEnter]);

  return (
    <LaneBlockWrapper
      ref={div}
      type={type}
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onLeave}
    />
  )
}

const LanesWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  margin-right: 40px;
  width: ${(timelineBarWidth + timelineBarMargin) * 5}px;
  z-index: 1;
  justify-content: flex-end;
  &::before, &::after {
    content: '';
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 1px;
    background: ${timelineGridLineColor};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: -2px;
  }
  @media print {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const LaneWrapper = styled.div`
  margin-left: ${timelineBarMargin}px;
  max-width: ${timelineBarWidth}px;
  flex: 1 1 ${timelineBarWidth}px;
  position: relative;
`;

export function TimelineLanes({
  lanes,
  resolution,
  hoveredId,
  onEnter,
  onLeave
}: {
  lanes: Lanes,
  resolution: number,
  hoveredId: string | null,
  onEnter: (id: string) => void,
  onLeave: () => void
}) {
  return (
    <LanesWrapper aria-hidden='true'>
      {lanes.map((lane, index) => (
        <LaneWrapper key={index}>
          {lane.map(({from, to, type, id}, index) => (
            <LaneBlock
              key={index}
              from={from}
              to={to}
              id={id}
              type={type}
              resolution={resolution}
              hovered={hoveredId === id}
              onEnter={onEnter}
              onLeave={onLeave}
            />
          ))}
        </LaneWrapper>
      ))}
    </LanesWrapper>
  );
}
