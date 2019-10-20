import * as React from 'react';
import styled from 'styled-components';
import {Photo} from '../../pages/home-page/photo';

const PhotoWrapper = styled.div`
  width: 150px;
  margin-right: 20px;
  flex: 0 0 auto;
`;

const HeaderWrapper = styled.header`
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Intro = styled.div`
  flex: 1 1 auto;
`;

const Name = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  margin-bottom: 5px;
`;

const Info = styled.div`
  font-weight: 300;
`;

const SocialLinks = styled.div`
  margin: 10px 0 0;
`;

const Social = styled.a`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 12px;
  & + & {
    margin-left: 10px;
  }
`;

export function Header() {
  return (
    <HeaderWrapper>
      <PhotoWrapper>
        <Photo />
      </PhotoWrapper>
      <Intro>
        <Name>Marat Dulin</Name>
        <Info>Engineering Lead at Zalando</Info>
        <Info>Full-Stack Web Developer</Info>
        <Info>Living in Berlin</Info>
        <SocialLinks>
          <Social href='https://github.com/mdevils'>github</Social>
          <Social href='https://www.linkedin.com/in/maratdulin/'>linkedin</Social>
          <Social href='https://www.facebook.com/max.devils'>facebook</Social>
          <Social href='https://twitter.com/mdevils'>twitter</Social>
        </SocialLinks>
      </Intro>
    </HeaderWrapper>
  );
}
