export type Project = {
  from: string;
  to: string;
  title: string;
  text: string;
  technologies: string[];
  challenges?: string[];
  isOpenSource?: boolean;
};

export const projects: Project[] = [
  {
    from: '2015-04',
    to: '2019-05',
    title: 'Matterway Studio',
    text: (
      'Mobile rapid application development toolset with TypeScript for automation. ' +
      'A huge React-based Electron app with Node.js backend. I was leading the team ' +
      'and was responsible for architecture and code quality of the project.'
    ),
    technologies: [
      'JavaScript', 'TypeScript', 'Node.js', 'React', 'Redux', 'ReactNative', 'Electron'
    ],
    challenges: [
      'Designing architecture',
      'Technical & team leadership',
      'Performance optimisation',
      'Memory usage optimisation'
    ]
  },
  {
    from: '2012-09',
    to: '2015-03',
    title: 'Yandex.Maps Frontend',
    text: (
      'Yandex.Maps is a map service, analogue of Google Maps. ' +
      'New Yandex.Maps was architected and re-written from scratch.'
    ),
    technologies: ['JavaScript', 'Node.js', 'BEM'],
    challenges: [
      'Designing architecture',
      'Technical leadership'
    ]
  },
  {
    from: '2013-01',
    to: '2016-04',
    title: 'JSCS: JavaScript Code Style checker',
    text: (
      'JSCS was created from scratch in a form of a tool to help teams follow ' +
      'the same codestyle by checking and fixing source code automatically. ' +
      'JSCS was used by many well-known OpenSource projects such as jQuery, ' +
      'Angular, Bootstrap, Grunt, Gulp, WordPress, Wikimedia and many others. ' +
      'Later the project was merged into ESLint.'
    ),
    technologies: ['JavaScript', 'Node.js'],
    challenges: [
      'Designing architecture',
      'OpenSource'
    ],
    isOpenSource: true
  },
  {
    from: '2013-03',
    to: '2015-01',
    title: 'ENB',
    text: (
      'BEM-based project bundler (like Webpack). Was created in order to ' +
      'improve BEM-based project build performance. For huge projects the ' +
      'performance was improved from 20 minutes to 15 seconds for a full ' +
      'rebuild. Still used in Yandex for building many of the frontend projects.'
    ),
    technologies: ['JavaScript', 'Node.js'],
    challenges: [
      'Designing architecture',
      'OpenSource'
    ],
    isOpenSource: true
  },
  {
    from: '2011-02',
    to: '2012-09',
    title: 'Framework for Gurnick projects',
    text: (
      'Framework is used by both gurnick.edu website and intranet websites. ' +
      'The framework was initially developed by me from scratch and then sold ' +
      'to Gurnick when I was joining Gurnick as a Senior Web Developer / Architect. ' +
      'During this project I was developing the framework according to new business ' +
      'demands and requests from other developers.'
    ),
    technologies: ['PHP', 'SQL', 'JavaScript', 'jQuery'],
    challenges: [
      'Designing architecture',
      'Technical leadership',
      'Performance optimisation'
    ]
  },
  {
    from: '2008-12',
    to: '2011-02',
    title: 'Yandex.Maps API',
    text: (
      'Designing and implementing Yandex.Maps API (alternative to Google Maps API). ' +
      'Optimising the product for different browsers.'
    ),
    technologies: ['JavaScript'],
    challenges: [
      'Designing architecture',
      'Cross-browser compatibility',
      'Performance optimisation',
      'Memory usage optimisation'
    ]
  },
  {
    from: '2008-06',
    to: '2008-11',
    title: 'habrahabr.ru',
    text: 'Implementing interactive interfaces in collaboration with UI/UX designers.',
    technologies: ['JavaScript'],
    challenges: [
      'Cross-browser compatibility'
    ]
  },
  {
    from: '2005-07',
    to: '2008-02',
    title: 'npoanna.ru',
    text: (
      'Implementing interactive interfaces in collaboration with UI/UX designers. ' +
      'Connecting website to intranet data sources. ' +
      'Optimising intranet content for the website (documents, spreadsheets, etc).'
    ),
    technologies: ['ASP.NET', 'C#', 'SQL']
  },
  {
    from: '2007-09',
    to: '2008-01',
    title: '3 websites for ILEAD',
    text: (
      'End-to-end website implementation for different customers for a company ' +
      'which I founded along with a partner.'
    ),
    technologies: ['ASP.NET', 'C#', 'PHP', 'SQL']
  },
  {
    from: '2005-11',
    to: '2008-01',
    title: 'allatravels.ru',
    text: 'Re-implementing the existing website, adding new features.',
    technologies: ['ASP.NET', 'C#', 'SQL'],
    challenges: []
  },
  {
    from: '2004-09',
    to: '2004-12',
    title: 'Internal CRM product at life.ru',
    text: (
      'WinForms-based application for managing different sources of information ' +
      '(agents) for newspaper life.ru.'
    ),
    technologies: ['WinForms', 'C#', 'SQL'],
    challenges: []
  }
];
