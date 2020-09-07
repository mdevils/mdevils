export type TimelineItemSource = {
  type: 'work' | 'openSource' | 'education' | 'public';
  title: string;
  points?: string[];
  link?: string;
  video?: string;
  audio?: string;
  photo?: string;
  from?: string;
  to: string;
  text?: string;
  language?: 'RUS';
  icon?: 'npm';
  work?: string[];
  software?: string[];
  importance?: number;
  team?: number;
  hideFromPrintVersion?: boolean;
}

export type TimelineItem = TimelineItemSource & {
  id: string;
}

const date = new Date();
const pad = (n: number) => n < 10 ? '0' + n : `${n}`;
const now = date.getFullYear() + '-' + pad(date.getMonth() + 1);

export const showWorkInTimeline: {[key: string]: boolean} = {
  'Team leadership': true,
  'JavaScript': true,
  'TypeScript': true,
  'Node.js': true,
  'React': true,
  'Redux': true
};

export const timeline: TimelineItem[] = ([
  {
    type: 'work',
    title: '.NET Developer',
    text: 'life.ru',
    link: 'https://life.ru/',
    from: '2004-09',
    to: '2004-12',
    work: ['C#', 'SQL'],
    software: ['WinForms']
  },
  {
    type: 'work',
    title: 'ASP.NET Developer',
    text: 'Allatravels',
    from: '2005-11',
    to: '2008-01',
    work: ['C#', 'SQL'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'Junior PHP Developer',
    text: 'Alezar',
    from: '2006-01',
    to: '2006-07',
    work: ['PHP', 'SQL']
  },
  {
    type: 'work',
    title: 'ASP.NET / PHP Developer',
    text: 'ILEAD',
    from: '2007-09',
    to: '2008-01',
    work: ['C#', 'PHP', 'JavaScript', 'SQL'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'ASP.NET Developer',
    text: 'NPO "Anna"',
    link: 'http://npoanna.ru/',
    from: '2005-07',
    to: '2008-02',
    work: ['C#'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'JavaScript Developer',
    text: 'Habrahabr.ru',
    link: 'https://habr.com/',
    from: '2008-06',
    to: '2008-11',
    work: ['JavaScript'],
    software: ['jQuery']
  },
  {
    type: 'work',
    title: 'JavaScript Developer',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2008-12',
    to: '2011-02',
    work: ['JavaScript'],
    software: ['jQuery'],
    points: [
      'Working on JavaScript API to make it friendly and easy to use for our users.',
      'Creating and developing Maps UI, keeping full cross-browser compatibility.',
      'Designing the architecture of the new major API version.'
    ]
  },
  {
    type: 'work',
    title: 'Senior Web Developer / Architect',
    text: 'Gurnick Academy of Medical Arts',
    link: 'https://www.gurnick.edu/',
    from: '2011-02',
    to: '2012-09',
    work: ['PHP', 'JavaScript', 'SQL'],
    software: ['jQuery'],
    points: [
      'Designing flexible and high-performing architecture.',
      'Developing and maintaining high-performing backend using PHP5.',
      'Creating and maintaining responsible UI (JavaScript, HTML5, CSS3).',
      'Optimising database workflows, database performance (MySQL).',
      'Covering the projects with unit-tests. Maintaining high coverage level.',
      'Working with the other developers, providing support.'
    ]
  },
  {
    type: 'work',
    title: 'Senior Frontend Developer',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2012-09',
    to: '2014-03',
    work: ['JavaScript', 'BEM', 'Node.js'],
    points: [
      'Designing the core architecture.',
      'Developing frontend applications (JavaScript, BEM).',
      'Creating server-side for the project using Node.js.',
      'Developing required Maps UI features with full cross-browser compatibility.',
      'Covering with unit-tests. Maintaining high coverage level.'
    ]
  },
  {
    type: 'work',
    title: 'Frontend Team Lead',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2014-03',
    to: '2015-03',
    work: ['Team leadership', 'JavaScript', 'BEM', 'Node.js'],
    points: [
      'Leading the Yandex.Maps Frontend team.',
      'Planning architecture changes, refactoring.',
      'Developing Maps service frontend (JavaScript, BEM).',
      'Building learning trajectory for each team member.',
      'Creating server-side for the project using Node.js.',
      'Developing required Maps UI features with full cross-browser compatibility.'
    ],
    team: 5
  },
  {
    type: 'work',
    title: 'Senior JavaScript Developer',
    text: 'Matterway',
    link: 'https://matterway.io/',
    from: '2015-04',
    to: '2015-10',
    work: ['JavaScript', 'Node.js', 'React', 'Redux'],
    points: [
      'Designing the core architecture.',
      'Developing Electron-based React and Redux application.',
      'Developing ReactNative application.',
      'Creating server-side for the project using Node.js.',
      'Covering with unit-tests. Maintaining high coverage level.'
    ]
  },
  {
    type: 'work',
    title: 'Engineering Team Lead',
    text: 'Matterway',
    link: 'https://matterway.io/',
    from: '2015-10',
    to: '2019-05',
    work: ['Team leadership', 'JavaScript', 'TypeScript', 'Node.js', 'React', 'Redux'],
    points: [
      'Leading the Engineering Team consisting of developers and QAs.',
      'Designing the core architecture, deciding on upgrades and refactoring.',
      'Deciding on product roadmap along with product owner and company founders.',
      'Defining team development culture and principles.',
      'Developing Electron-based React and Redux applications (TypeScript).',
      'Developing ReactNative applications (TypeScript).',
      'Helping team members to develop their skills, arranging external learning.',
      'Establishing and managing agile development and release process.',
      'Hiring the whole team, organising hiring process, preparing challenges and questionnaires.',
      'Promoting new technologies and approaches, organising knowledge sharing processes.',
      'Maintaining high quality of source code and infrastructure.',
      'Optimising in-team and cross-team processes.',
      'Continuous integration: releases, unit tests, integration tests, test coverage monitoring.',
      'Backend infrastructure using Docker containers, aggregated server status monitoring.'
    ],
    team: 5
  },
  {
    type: 'work',
    title: 'Engineering Team Lead',
    text: 'Zalando Lounge',
    link: 'https://www.zalando-lounge.com/',
    from: '2019-07',
    to: '2019-12',
    work: ['Team leadership', 'JavaScript', 'TypeScript', 'Node.js', 'React', 'Redux'],
    points: [
      'Defining team development culture and principles.',
      'Helping team members to develop their skills, arranging learning and trainings.',
      'Organising team workshops to help team members to get on the same level.',
      'Hiring new developers for the team.',
      'Supporting high quality of source code and infrastructure.',
      'Optimising in-team and cross-team processes.',
      'Participating in department-level decisions and initiatives.'
    ],
    team: 10
  },
  {
    type: 'work',
    title: 'Frontend Lead',
    text: 'ARRIVAL',
    link: 'https://www.arrival.com/',
    from: '2020-04',
    to: now,
    work: ['Team leadership', 'JavaScript', 'TypeScript', 'Node.js', 'React', 'Redux'],
    points: [
      'Defining team development culture and principles.',
      'Hiring new developers for the team.',
      'Supporting high quality of source code and infrastructure.'
    ]
  },
  {
    type: 'education',
    title: 'Graduated school',
    from: '1993-09',
    to: '2004-06',
    hideFromPrintVersion: true
  },
  {
    type: 'education',
    title: 'Bachelor of Information Technology in Economics',
    text: 'Plekhanov Russian University of Economics',
    link: 'https://www.rea.ru/en/Pages/default.aspx',
    from: '2004-09',
    to: '2009-06'
  },
  {
    type: 'education',
    title: 'German courses',
    text: 'A2 → B2 level',
    link: 'https://www.das-akademie.de/en/',
    from: '2016-06',
    to: '2017-06',
    hideFromPrintVersion: true
  },
  {
    type: 'education',
    title: 'English courses',
    text: 'Beginner → Advanced level',
    from: '2000-07',
    to: '2004-05',
    hideFromPrintVersion: true
  },
  {
    type: 'education',
    title: 'Team leadership courses',
    text: 'Leadership, team management',
    to: '2014-08'
  },
  {
    type: 'education',
    title: 'German courses',
    text: 'C1 level',
    from: '2019-08',
    to: '2019-10',
    hideFromPrintVersion: true
  },
  {
    type: 'openSource',
    title: 'ENB',
    text: 'BEM-based project bundler (like Webpack)',
    link: 'https://en.bem.info/toolbox/enb/',
    icon: 'npm',
    from: '2013-03',
    to: '2015-01'
  },
  {
    type: 'openSource',
    title: 'TypeScript Exercises',
    text: 'A set of interactive TypeScript exercises',
    link: 'https://typescript-exercises.github.io/',
    from: '2020-03',
    to: now
  },
  {
    type: 'openSource',
    title: 'JSCS',
    text: 'JavaScript CodeStyle checker',
    link: 'https://jscs-dev.github.io/',
    icon: 'npm',
    from: '2013-01',
    to: '2016-04'
  },
  {
    type: 'openSource',
    title: 'html-entities',
    text: 'HTML Entities encoder / decoder',
    link: 'https://www.npmjs.com/package/html-entities',
    icon: 'npm',
    importance: 2,
    from: '2013-02',
    to: '2019-08'
  },
  {
    type: 'openSource',
    title: 'css-selector-parser',
    text: 'CSS Selector parser',
    link: 'https://www.npmjs.com/package/css-selector-parser',
    icon: 'npm',
    importance: 2,
    from: '2013-02',
    to: '2016-11'
  },
  {
    type: 'openSource',
    title: 'CST',
    text: 'JavaScript concrete syntax tree parser',
    link: 'https://www.npmjs.com/package/cst',
    icon: 'npm',
    importance: 2,
    from: '2015-06',
    to: '2016-04'
  },
  {
    type: 'public',
    title: 'Talk: "Developing component libraries"',
    text: 'Yandex Conference in Moscow, Russia',
    video: 'https://video.yandex.ru/users/ya-events/view/1788/',
    language: 'RUS',
    to: '2013-10'
  },
  {
    type: 'public',
    title: 'Talk: "ENB: BEM project assembler"',
    text: 'BEMup in Moscow, Russia',
    video: 'https://events.yandex.ru/events/bemup/2-october-2013/?openTalkVideo=297-3',
    language: 'RUS',
    to: '2013-10'
  },
  {
    type: 'public',
    title: 'Talk: "JSCS: Developing OpenSource architecture"',
    text: 'JS Meetup in Rostov-on-Don, Russia',
    link: 'https://www.facebook.com/events/562939683813604/',
    video: 'https://www.youtube.com/watch?v=VpKIiwYR-n0',
    language: 'RUS',
    to: '2014-03'
  },
  {
    type: 'public',
    title: 'Talk: "BEViS & BT" with Vadim Makishvili',
    text: 'CodeFest in Novosibirsk, Russia',
    link: 'https://2014.codefest.ru/lecture/790',
    video: 'https://www.youtube.com/watch?v=4qh6ko8jNKc',
    language: 'RUS',
    to: '2014-03'
  },
  {
    type: 'public',
    title: 'Talk: "BEViS & BT" with Vadim Makishvili',
    text: 'RIT++ in Moscow, Russia',
    link: 'https://www.kp.ru/daily/26216.5/3100206/',
    language: 'RUS',
    to: '2014-04'
  },
  {
    type: 'public',
    title: 'Podcast interview: "JSCS, BEViS, Leadership"',
    text: 'Radio JS in Berlin, Germany',
    link: 'https://radiojs.ru/2015/06/radiojs-25/',
    audio: 'https://www.youtube.com/watch?v=VpKIiwYR-n0',
    language: 'RUS',
    to: '2015-06'
  },
  {
    type: 'public',
    title: 'Talk: "JSCS: JavaScript Code Style checker"',
    text: 'Fullstack.JS in Berlin, Germany',
    link: 'https://www.meetup.com/fullstack-berlin/events/226856447/',
    photo: 'https://twitter.com/_andreasgrimm/status/672500021233885184',
    to: '2015-12'
  }
] as TimelineItemSource[]).map((item: TimelineItemSource, index: number) => ({...item, id: `${index}`}));

export function compareDateDesc(a: string, b: string): 1 | -1 | 0 {
  return a > b ? -1 : b > a ? 1 : 0;
}
