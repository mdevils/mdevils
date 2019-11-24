import {useCallback} from 'react';
import * as React from 'react';
import styled from 'styled-components';
import {filterColors, timelineBarSpacer, timelineGridLineColor, TimelineItemLaned, TimelineItemType} from '../const';
import {formatDate, formatDuration, getDurationInMonths} from '../format-duration';
import {TimelineItemsByEndDate} from '../get-timeline-index';
import npmIcon from './npm.png';
import peopleIcon from './people.png';

const TimelineDate = styled.div<{hideFromPrintVersion: boolean}>`
  position: relative;
  min-height: 1px;
  @media screen {
    & + & {
      margin-top: 20px;
    }
  }
  page-break-inside: avoid;
  @media print {
    ${({hideFromPrintVersion}) => hideFromPrintVersion ? 'display: none;' : ''}
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
  @media print {
    display: none;
  }
`;

const ItemWrapper = styled.div<{
  type: TimelineItemType,
  hovered: boolean,
  hideFromPrintVersion?: boolean
}>`
  @media screen {
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
  }
  @media print {
    margin-bottom: 10px;
    ${({hideFromPrintVersion}) => hideFromPrintVersion ? 'display: none;' : ''}
  }
`;

const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  @media screen {
    margin-right: 10px;
  }
  @media print {
    margin-right: 5px;
  }
`;
const ItemText = styled.span`
  font-size: 14px;
`;
const ItemTextLink = styled.a`
  @media print {
    text-decoration: none;
  }
`;
const ItemVideoLink = styled.a`
  font-size: 14px;
`;
const ItemAudioLink = styled.a`
  font-size: 14px;
`;
const ItemPhotoLink = styled.a`
  font-size: 14px;
`;
const ItemLineWrapper = styled.div<{screen?: boolean}>`
  ${({screen}) => screen ? '@media print { display: none; }' : ''}
`;

const ItemHeader = styled.div``;
const ItemDuration = styled.span<{type: TimelineItemType}>`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  @media print {
    display: none;
  }
`;
const ItemPrintDuration = styled.span`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
  @media screen {
    display: none;
  }
`;
const ItemShortInfoPrint = styled.span`
  font-size: 14px;
  margin-right: 10px;
  @media screen {
    display: none;
  }
`;

const ItemLang = styled.div`
  font-weight: 500;
  font-size: 10px;
  margin-left: 5px;
  display: inline-block;
  background: #7bf;
  padding: 1px 3px;
  color: white;
  @media print {
    display: none;
  }
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
  @media print {
    display: none;
  }
`;

const ItemPeopleIcon = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #555;
  @media screen {
    margin-left: 10px;
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
  }
  @media print {
    margin-left: 5px;
    &:before {
      content: '(';
    }
    &:after {
      content: ')';
    }
  }
`;

const ItemPoints = styled.div`
  margin-top: 5px;
`;

const ItemPoint = styled.div`
  font-size: 12px;
  &:before {
    content: '— ';
  }
  & + & {
    margin-top: 2px;
  }
  @media print {
    font-size: 14px;
    margin-top: 3px;
  }
`;

function Item({
  item: {
    title,
    text,
    id,
    type,
    to,
    from = to,
    link,
    video,
    audio,
    photo,
    language,
    icon,
    team,
    points,
    hideFromPrintVersion
  },
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
  const shortViewInPrintVersion = !points;
  const duration = from !== to ? (
    <ItemDuration type={type}>
      {' '}
      {formatDuration(getDurationInMonths(from, to))}
    </ItemDuration>
  ): null;
  const shortInfo = shortViewInPrintVersion ?
    (<ItemShortInfoPrint>{text}</ItemShortInfoPrint>) :
    null;

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
    <ItemLineWrapper screen={shortViewInPrintVersion}>
      {textContent}
    </ItemLineWrapper>
  );

  let pointsContent = null;
  if (points) {
    pointsContent = (
      <ItemPoints>
        {points.map((point, index) => (
          <ItemPoint key={index}>{point}</ItemPoint>
        ))}
      </ItemPoints>
    );
  }

  const videoContent = video && (
    <ItemLineWrapper screen>
      <ItemVideoLink href={video}>
        Video
      </ItemVideoLink>
    </ItemLineWrapper>
  );

  const audioContent = audio && (
    <ItemLineWrapper screen>
      <ItemAudioLink href={audio}>
        Audio
      </ItemAudioLink>
    </ItemLineWrapper>
  );

  const photoContent = photo && (
    <ItemLineWrapper screen>
      <ItemPhotoLink href={photo}>
        Photo
      </ItemPhotoLink>
    </ItemLineWrapper>
  );

  let printDuration = (
    from === to ?
      (<ItemPrintDuration>({formatDate(from)})</ItemPrintDuration>) :
      (
        <ItemPrintDuration>
          ({formatDate(from)} — {formatDate(to)})
        </ItemPrintDuration>
      )
  );
  return (
    <ItemWrapper
      type={type}
      hovered={hovered}
      hideFromPrintVersion={hideFromPrintVersion}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onLeave}
    >
      <ItemHeader>
        <ItemTitle>
          {title}
        </ItemTitle>
        {shortInfo}
        {duration}
        {printDuration}
      </ItemHeader>
      {textContent}
      {videoContent}
      {audioContent}
      {photoContent}
      {pointsContent}
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
        <TimelineDate
          data-date={date}
          hideFromPrintVersion={(index[date] || []).every(({hideFromPrintVersion}) => hideFromPrintVersion)}
          key={date}
        >
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
