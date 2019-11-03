import {useCallback} from 'react';
import * as React from 'react';
import styled from 'styled-components';
import {filterColors, timelineBarSpacer, timelineGridLineColor, TimelineItemLaned, TimelineItemType} from '../const';
import {formatDuration, getDurationInMonths} from '../format-duration';
import {TimelineItemsByEndDate} from '../get-timeline-index';
import npmIcon from './npm.png';
import peopleIcon from './people.png';

const TimelineDate = styled.div`
  position: relative;
  min-height: 1px;
  & + & {
    margin-top: 20px;
  }
`;

const TimelineItemsWrapper = styled.div`
  flex: 1 1 auto;
`;

const TimelineDateMarker = styled.time`
  background: white;
  margin-left: -140px;
  margin-top: -${9 + timelineBarSpacer/2}px;
  border-bottom: 1px ${timelineGridLineColor} solid;
  font-size: 10px;
  width: 105px;
  position: absolute;
  z-index: 0;
  top: 50%;
`;

const ItemWrapper = styled.div<{type: TimelineItemType, hovered: boolean}>`
  &::before {
    content: '';
    background: ${({type}) => filterColors[type]};
    color: white;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 4px 0 0 -16px;
    opacity: ${({hovered}) => hovered ? 1 : 0.5};
  }
  & + & {
    margin-top: 10px;
  }
`;

const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  margin-right: 10px;
`;
const ItemText = styled.span`
  font-size: 14px;
`;
const ItemTextLink = styled.a``;
const ItemVideoLink = styled.a`
  font-size: 14px;
`;
const ItemAudioLink = styled.a`
  font-size: 14px;
`;
const ItemPhotoLink = styled.a`
  font-size: 14px;
`;
const ItemLineWrapper = styled.div``;

const ItemHeader = styled.div``;
const ItemDuration = styled.span<{type: TimelineItemType}>`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
`;

const ItemLang = styled.div`
  font-weight: 500;
  font-size: 10px;
  margin-left: 5px;
  display: inline-block;
  background: #7bf;
  padding: 1px 3px;
  color: white;
`;

const ItemIcon = styled.div`
  display: inline-block;
  margin-left: 5px;
  position: relative;
  top: 3px;
  height: 14px;
  width: 14px;
  background: url(${npmIcon});
  background-size: 100% 100%;
`;

const ItemPeopleIcon = styled.div`
  margin-left: 10px;
  display: inline-block;
  font-size: 12px;
  color: #555;
  &:before {
    content: '';
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: 3px;
    height: 14px;
    width: 14px;
    background: url(${peopleIcon});
    background-size: 100% 100%;
  }
`;

function Item({
  item: {title, text, id, type, to, from = to, link, video, audio, photo, language, icon, team},
  onEnter,
  onLeave,
  hovered
}: {
  item: TimelineItemLaned,
  onEnter: (id: string) => void,
  onLeave: () => void,
  hovered: boolean
}) {
  const onMouseEnter = useCallback(() => onEnter(id), [id, onEnter]);
  const duration = from !== to ? (
    <ItemDuration type={type}>
      {' '}
      {formatDuration(getDurationInMonths(from, to))}
    </ItemDuration>
  ): null;

  let textContent = (<ItemText>{text}</ItemText>);
  if (language) {
    textContent = <>{textContent}<ItemLang aria-label='In russian'>{language}</ItemLang></>
  }
  if (icon) {
    textContent = <>{textContent}<ItemIcon aria-label='NPM package' /></>
  }
  if (team) {
    textContent = <>{textContent}<ItemPeopleIcon>{team} members team</ItemPeopleIcon></>
  }
  if (link) {
    textContent = <ItemTextLink href={link}>{textContent}</ItemTextLink>;
  }

  textContent = (
    <ItemLineWrapper>
      {textContent}
    </ItemLineWrapper>
  );

  const videoContent = video && (
    <ItemLineWrapper>
      <ItemVideoLink href={video}>
        Video
      </ItemVideoLink>
    </ItemLineWrapper>
  );

  const audioContent = audio && (
    <ItemLineWrapper>
      <ItemAudioLink href={audio}>
        Audio
      </ItemAudioLink>
    </ItemLineWrapper>
  );

  const photoContent = photo && (
    <ItemLineWrapper>
      <ItemPhotoLink href={photo}>
        Photo
      </ItemPhotoLink>
    </ItemLineWrapper>
  );

  return (
    <ItemWrapper
      type={type}
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onLeave}
    >
      <ItemHeader>
        <ItemTitle>
          {title}
        </ItemTitle>
        {duration}
      </ItemHeader>
      {textContent}
      {videoContent}
      {audioContent}
      {photoContent}
    </ItemWrapper>
  );
}

export function TimelineItems({dates, index, onEnter, onLeave, hoveredId}: {
  dates: string[],
  index: TimelineItemsByEndDate,
  onEnter: (id: string) => void,
  onLeave: () => void,
  hoveredId: string | null
}) {
  return (
    <TimelineItemsWrapper>
      {dates.map((date) => (
        <TimelineDate data-date={date} key={date}>
          <TimelineDateMarker dateTime={date} aria-hidden={true}>
            {date.split('-').reverse().join('.')}
          </TimelineDateMarker>
          {(index[date] || []).map((item) => (
            <Item
              item={item}
              onEnter={onEnter}
              onLeave={onLeave}
              hovered={hoveredId === item.id}
              key={item.id}
            />
          ))}
        </TimelineDate>
      ))}
    </TimelineItemsWrapper>
  );
}
