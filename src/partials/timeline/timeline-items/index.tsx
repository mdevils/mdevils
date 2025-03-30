import {useCallback} from 'react';
import * as React from 'react';
import styled from 'styled-components';
import {filterColors, timelineBarSpacer, timelineGridLineColor, TimelineItemLaned, TimelineItemType} from '../const';
import {formatDate, formatDuration, getDurationInMonths} from '../format-duration';
import {TimelineItemsByEndDate} from '../get-timeline-index';
import npmIcon from './npm.png';
import crateIcon from './crate.png';
import peopleIcon from './people.png';
import {now, onlyTimelineWork, PackageIcon, packageIconLabels} from '../../../data/timeline';

const TimelineDate = styled.div<{hideFromPrintVersion: boolean; hideFromTabletVersion: boolean}>`
  position: relative;
  min-height: 1px;
  @media screen {
    & + & {
      margin-top: 20px;
    }
  }
  page-break-inside: avoid;
  @media print {
    ${({hideFromPrintVersion}) => hideFromPrintVersion && 'display: none;'}
  }
  @media (max-width: 768px) {
    ${({hideFromTabletVersion}) => hideFromTabletVersion && 'display: none;'}
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
  font-size: 0.625em;
  width: 105px;
  position: absolute;
  z-index: 0;
  top: 50%;
  @media print {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

// eslint-disable-next-line no-unexpected-multiline
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
  @media screen {
    margin-right: 10px;
  }
  @media print {
    margin-right: 5px;
  }
`;
const ItemText = styled.span`
  font-size: 0.875em;
`;
const ItemTextLink = styled.a`
  @media print {
    text-decoration: none;
  }
`;
const ItemVideoLink = styled.a`
  font-size: 0.875em;
`;
const ItemAudioLink = styled.a`
  font-size: 0.875em;
`;
const ItemPhotoLink = styled.a`
  font-size: 0.875em;
`;
const ItemLineWrapper = styled.div<{screen?: boolean}>`
  ${({screen}) => screen ? '@media print { display: none; }' : ''}
`;

const ItemHeader = styled.div``;
const ItemDuration = styled.span<{type: TimelineItemType}>`
  font-size: 0.875em;
  color: #555;
  white-space: nowrap;
  @media print {
    display: none;
  }
`;
const ItemPrintDuration = styled.span`
  font-size: 0.875em;
  color: #555;
  white-space: nowrap;
  @media screen {
    display: none;
  }
`;
const ItemShortInfoPrint = styled.span`
  font-size: 0.875em;
  margin-right: 10px;
  @media screen {
    display: none;
  }
`;

const ItemLang = styled.div`
  font-weight: 500;
  font-size: 0.625em;
  margin-left: 5px;
  display: inline-block;
  background: #7bf;
  padding: 1px 3px;
  color: white;
  @media print {
    display: none;
  }
`;

const ItemIcon = styled.div<{icon: PackageIcon}>`
  display: inline-block;
  margin-left: 5px;
  position: relative;
  top: 3px;
  height: 14px;
  width: 14px;
  background: url(${({icon}) => icon === 'npm' ? npmIcon : crateIcon});
  background-size: 100% 100%;
  @media print {
    display: none;
  }
`;

const ItemPeopleIcon = styled.div`
  display: inline-block;
  font-size: 0.75em;
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

const ItemPoints = styled.ul`
  margin: 5px 0 0;
  list-style-type: '—';
  padding: 0 0 0 0.6em;
`;

const ItemPoint = styled.li`
  padding-left: 0.2em;
  font-size: 0.75em;
  & + & {
    margin-top: 2px;
  }
  &::marker {
    margin-left: -1em;
  }
  @media print {
    font-size: 0.875em;
    margin-top: 3px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 2em;
  align-items: flex-start;
`;
const ItemDetailsLeft = styled.div`
  flex: 1 1 auto;
`;
const ItemDetailsRight = styled.dt`
  margin: 0;
  padding: 0;
  flex: 0 0 30%;
  border-left: 2px #bbb solid;
  padding-left: 2em;
  font-size: 0.875em;
  @media screen {
    display: none;
  }
`;

const ItemDetailsRightKey = styled.dt`
  margin: 0;
  padding: 0;
  color: #555;
  font-weight: 500;
  margin-bottom: 0.5em;
`;
const ItemDetailsRightValue = styled.dd`
  margin: 0;
  padding: 0;
  & + dt {
    margin-top: 1em;
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
    hideFromPrintVersion,
    work,
    keyAchievement
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
    textContent = <>{textContent}<ItemIcon icon={icon} aria-label={packageIconLabels[icon]} /></>
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
          ({formatDate(from)} — {to === now ? 'now' : formatDate(to)})
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
      <ItemDetails>
        <ItemDetailsLeft>
          {videoContent}
          {audioContent}
          {photoContent}
          {pointsContent}
        </ItemDetailsLeft>
        {pointsContent && <ItemDetailsRight>
          {keyAchievement && (
            <>
              <ItemDetailsRightKey>Key achievement</ItemDetailsRightKey>
              <ItemDetailsRightValue>
                {keyAchievement}
              </ItemDetailsRightValue>
            </>
          )}
          {work && (
            <>
              <ItemDetailsRightKey>Technologies</ItemDetailsRightKey>
              <ItemDetailsRightValue>
                {work.filter((work) => !onlyTimelineWork[work]).join(', ')}
              </ItemDetailsRightValue>
            </>
          )}
        </ItemDetailsRight>}
      </ItemDetails>
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
          hideFromTabletVersion={!index[date]}
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
