import {useCallback} from 'react';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Photo} from '../../pages/home-page/photo';
import {breakpoints} from '../../tokens/breakpoints';

const phoneNumber = atob(['I2NTkxMQ==', 'E1MiAzNj', 'KzQ5ID'].reverse().join(''));

const PhotoWrapper = styled.div`
  width: 150px;
  margin-right: 20px;
  flex: 0 0 auto;
  @media {
    width: 120px;
  }
`;

const HeaderWrapper = styled.header`
  position: relative;
  margin: 20px 0 0 0;
  @media (${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Intro = styled.div`
  flex: 0 1 auto;
  margin-top: 20px;
  @media (${breakpoints.tablet}) {
    margin-top: 0;
  }
`;

const Name = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  margin-bottom: 5px;
`;

const Info = styled.div`
  font-weight: 300;
  margin-right: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  margin-top: 0;
  left: 170px;
  @media (${breakpoints.tablet}) {
    position: static;
    margin-left: 10px;
    @media print {
      margin-top: 17px;
    }
  }
`;

const PhoneNumber = styled.div`
  @media screen {
    font-size: 14px;
    font-weight: 300;
    display: none;
  }
`;

function Social({href, children}: {href: string, children: string}) {
  return (
    <SocialWrapper href={href}>
      <SocialScreenText>{children}</SocialScreenText>
      <SocialPrintText>{href.replace(/(^https?:\/\/(?:www\.)?|\/$)/g, '')}</SocialPrintText>
    </SocialWrapper>
  );
}

const SocialWrapper = styled.a`
  & + & {
    @media print {
      margin-top: 2px;
    }
  }
`;

const SocialScreenText = styled.span`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 10px;
  @media print {
    display: none;
  }
`;

const SocialPrintText = styled.span`
  font-size: 12px;
  @media screen {
    display: none;
  }
`;

const Email = styled.a`
  font-size: 14px;
  text-decoration: none;
  font-weight: 400;
`;

const Menu = styled.nav`
  list-style: none;
  margin: 10px 0 0;
  @media print {
    display: none;
  }
`;
const MenuItem = styled.li`
  display: inline-block;
  margin-right: 10px;
`;
const MenuItemText = styled.span`
  text-transform: uppercase;
  font-size: 12px;
`;

const email = atob(['bWRldmlsc0B5', 'YW5kZXgucnU='].join(''));

export const Header = withRouter(({location}) => {
  const path = location.pathname;

  const onClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  }, []);

  return (
    <HeaderWrapper aria-label='Brief information about me'>
      <PhotoWrapper>
        <Photo />
      </PhotoWrapper>
      <Intro>
        <Name>Marat Dulin</Name>
        <Info>Engineering Lead at Zalando</Info>
        <Info>Full-Stack Web Developer</Info>
        <Info>Located in Berlin</Info>
        <Info><Email href='#' onClick={onClick}>{email}</Email></Info>
        <Menu>
          {path !== '/' && (
            <MenuItem>
              <Link to={'/'}>
                <MenuItemText>← Home</MenuItemText>
              </Link>
            </MenuItem>
          )}
          {path !== '/books' && (
            <MenuItem>
              <Link to={'/books'}>
                <MenuItemText>My Books</MenuItemText>
              </Link>
            </MenuItem>
          )}
          {path !== '/projects' && (
            <MenuItem>
              <Link to={'/projects'}>
                <MenuItemText>Projects</MenuItemText>
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Intro>
      <SocialLinks>
        <PhoneNumber>
          {phoneNumber}
        </PhoneNumber>
        <Social href='https://github.com/mdevils'>
          github
        </Social>
        <Social href='https://www.linkedin.com/in/maratdulin/'>
          linkedin
        </Social>
        <Social href='https://twitter.com/mdevils'>
          twitter
        </Social>
      </SocialLinks>
    </HeaderWrapper>
  );
});
