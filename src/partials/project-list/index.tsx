import {default as React} from 'react';
import styled from 'styled-components';
import {Project} from '../../data/projects';
import {formatDuration, getDurationInMonths} from '../timeline/format-duration';
import {Text} from '../../components/text';

const ItemListWrapper = styled.ul`
  margin: 20px 0 0;
  list-style: none;
  padding: 0;
  max-width: 500px;
`;

export function ProjectList({projects}: {projects: Project[]}) {
  return (
    <ItemListWrapper>
      {projects.map((project, index) => (
        <Item item={project} key={index} />
      ))}
    </ItemListWrapper>
  );
}

const ItemWrapper = styled.li<{isOpenSource: boolean}>`
  &::before {
    content: '';
    background: ${({isOpenSource}) => isOpenSource ? '#880' : '#428559'};
    color: white;
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 4px 0 0 -16px;
    opacity: 0.5;
  }
  & + & {
    margin-top: 20px;
  }
`;
const ItemDuration = styled.span`
  font-size: 14px;
  color: #555;
  white-space: nowrap;
`;
const ItemHeader = styled.div``;
const ItemTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  margin-right: 10px;
`;
const ItemText = styled.span`
  font-size: 14px;
`;
const ItemTechs = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
`;
const ItemTech = styled.span`
  color: #777;
`;
const ItemTechTitle = styled.span`
  white-space: nowrap;
  color: #428559;
`;
const ItemChallenges = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: 500;
`;
const ItemChallenge = styled.span`
  color: #777;
`;
const ItemChallengeTitle = styled.span`
  white-space: nowrap;
  color: #295884;
`;

function Item({
  item: {title, text, to, from, challenges, technologies, isOpenSource}
}: {
  item: Project
}) {
  const duration = from !== to ? (
    <ItemDuration>
      {' '}
      {formatDuration(getDurationInMonths(from, to))}
    </ItemDuration>
  ): null;

  return (
    <ItemWrapper isOpenSource={Boolean(isOpenSource)}>
      <ItemHeader>
        <ItemTitle>
          {title}
        </ItemTitle>
        {duration}
      </ItemHeader>
      <ItemText><Text text={text} /></ItemText>
      {challenges && <ItemChallenges>
        {challenges.map((challenge, index) => (
          <ItemChallenge key={index}>
            {index > 0 ? ', ' : ''}
            <ItemChallengeTitle>{challenge}</ItemChallengeTitle>
          </ItemChallenge>
        ))}
      </ItemChallenges>}
      <ItemTechs>
        {technologies.map((tech, index) => (
          <ItemTech key={index}>
            {index > 0 ? ', ' : ''}
            <ItemTechTitle>{tech}</ItemTechTitle>
          </ItemTech>
        ))}
      </ItemTechs>
    </ItemWrapper>
  );
}
