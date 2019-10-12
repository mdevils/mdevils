import * as React from 'react';
import {Header} from '../../components/header';
import {PageContainer} from '../../components/page-container';
import {Chronology} from '../../partials/chronology';


export function HomePage() {
  return (
    <>
      <PageContainer as='header'>
        <Header />
      </PageContainer>
      <PageContainer as='main'>
        <Chronology />
      </PageContainer>
    </>
  );
}
