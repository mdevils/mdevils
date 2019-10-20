import * as React from 'react';
import styled from 'styled-components';
import {Header} from '../header';
import {PageContainer} from '../../components/page-container';

const PageContentWrapper = styled.div`
  margin: 20px 0 40px;
`;

export function PageLayout({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <>
      <PageContainer as='header'>
        <Header />
      </PageContainer>
      <PageContainer as='main'>
        <PageContentWrapper>
          {children}
        </PageContentWrapper>
      </PageContainer>
    </>
  );
}
