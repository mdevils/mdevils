import * as React from 'react';
import {timeline} from '../../data/timeline';
import {Timeline} from '../../partials/timeline';
import {PageLayout} from '../../partials/page-layout';


export function HomePage() {
  return (
    <PageLayout>
      <Timeline timeline={timeline} />
    </PageLayout>
  );
}
