import * as React from 'react';
import styled from 'styled-components';
import {Heading} from '../../components/heading';
import {projects} from '../../data/projects';
import {PageLayout} from '../../partials/page-layout';
import {ProjectList} from '../../partials/project-list';

const ProjectsSection = styled.section``;

export function ProjectsPage() {
  return (
    <PageLayout>
      <ProjectsSection aria-labelledby='projects-heading'>
        <Heading id='projects-heading'>{projects.length} projects</Heading>
        <ProjectList
          projects={projects}
        />
      </ProjectsSection>
    </PageLayout>
  );
}
