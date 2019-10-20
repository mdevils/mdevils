import * as React from 'react';
import styled from 'styled-components';

const fontSizeByHeadingLevel = {
  1: 24,
  2: 18
};

type HeadingLevel = 1 | 2;

const Title = styled.div<{level: HeadingLevel}>`
  font-size: ${({level}) => fontSizeByHeadingLevel[level]}px;
  margin: 0;
  padding: 0;
`;

export function Heading({level, children, id}: {level?: HeadingLevel, id?: string, children: React.ReactNode}) {
  level = level || 1;
  return (
    <Title
      as={`h${level}` as any}
      level={level}
      id={id}
    >
      {children}
    </Title>
  );
}
