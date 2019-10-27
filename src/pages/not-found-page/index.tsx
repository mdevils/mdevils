import * as React from 'react';
import {Link} from 'react-router-dom';
import {PageLayout} from '../../partials/page-layout';

export function NotFoundPage() {
  return (
    <PageLayout>
      <div>
        For some reason this page was not found...
      </div>
      <div>
        <Link to={'/'}>Go to home page</Link>
      </div>
    </PageLayout>
  );
}
