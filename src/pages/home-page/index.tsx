import * as React from 'react';
import {timeline} from '../../data/timeline';
import {Timeline} from '../../partials/timeline';
import {PageLayout} from '../../partials/page-layout';
import {TimelineByType} from '../../partials/timeline-by-type';


export function HomePage() {
  return (
    <PageLayout>
      <Timeline {...{timeline}} />
      <TimelineByType {...{timeline}} />
    </PageLayout>
  );
}
