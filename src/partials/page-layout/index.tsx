import * as React from 'react';
import styled from 'styled-components';
import {Header} from '../header';
import {PageContainer} from '../../components/page-container';

const PageContentWrapper = styled.div`
  margin: 20px 0 40px;
`;

const ToContentLink = styled.a`
  position: absolute;
  margin-left: -10000px;
  padding: 5px 10px;
  background: white;
  &:focus {
    margin-left: 0;
  }
`;

export function PageLayout({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <>
      <PageContainer as='header'>
        <ToContentLink href='#main' tabIndex={1}>Skip to content</ToContentLink>
        <Header />
      </PageContainer>
      <PageContainer as='main' id='main'>
        <PageContentWrapper>
          {children}
        </PageContentWrapper>
      </PageContainer>
    </>
  );
}
