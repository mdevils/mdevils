import styled from 'styled-components';
import {breakpoints} from '../../tokens/breakpoints';

export const PageContainer = styled.div`
  margin: 0 20px;
  @media (${breakpoints.tablet}) {
    margin: 0 40px;
  }
  @media (${breakpoints.desktop}) {
    margin: 0 80px;
  }
  @media (${breakpoints.desktopWide}) {
    width: 1100px;
    margin: 0 auto;
  }
`;
