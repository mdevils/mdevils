export type TimelineItemSource = {
  type: 'work' | 'openSource' | 'education' | 'public';
  title: string;
  link?: string;
  video?: string;
  audio?: string;
  photo?: string;
  from?: string;
  to: string;
  text?: string;
  language?: 'RUS';
  programmingLanguages?: string[];
  software?: string[];
  importance?: number;
}

export type TimelineItem = TimelineItemSource & {
  id: string;
}

const date = new Date();
const pad = (n: number) => n < 10 ? '0' + n : `${n}`;
const now = date.getFullYear() + '-' + pad(date.getMonth() + 1);

export const timeline: TimelineItem[] = ([
  {
    type: 'work',
    title: '.NET Developer',
    text: 'life.ru',
    link: 'https://life.ru/',
    from: '2004-09',
    to: '2004-12',
    programmingLanguages: ['C#', 'SQL'],
    software: ['WinForms']
  },
  {
    type: 'work',
    title: 'ASP.NET Developer',
    text: 'Allatravels',
    from: '2004-11',
    to: '2008-01',
    programmingLanguages: ['C#', 'SQL'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'Junior PHP Developer',
    text: 'Alezar',
    from: '2006-01',
    to: '2006-07',
    programmingLanguages: ['PHP', 'SQL']
  },
  {
    type: 'work',
    title: 'ASP.NET / PHP Developer',
    text: 'ILEAD',
    from: '2007-09',
    to: '2008-01',
    programmingLanguages: ['C#', 'PHP', 'JavaScript', 'SQL'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'ASP.NET Developer',
    text: 'NPO "Anna"',
    link: 'http://npoanna.ru/',
    from: '2004-07',
    to: '2008-02',
    programmingLanguages: ['C#', 'JavaScript'],
    software: ['ASP.NET']
  },
  {
    type: 'work',
    title: 'JavaScript Developer',
    text: 'Habrahabr.ru',
    link: 'https://habr.com/',
    from: '2008-06',
    to: '2008-11',
    programmingLanguages: ['JavaScript'],
    software: ['jQuery']
  },
  {
    type: 'work',
    title: 'JavaScript Developer',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2008-12',
    to: '2011-02',
    programmingLanguages: ['JavaScript'],
    software: ['jQuery']
  },
  {
    type: 'work',
    title: 'Senior Web Developer / Architect',
    text: 'Gurnick Academy of Medical Arts',
    link: 'https://www.gurnick.edu/',
    from: '2011-02',
    to: '2012-09',
    programmingLanguages: ['PHP', 'JavaScript', 'SQL'],
    software: ['jQuery']
  },
  {
    type: 'work',
    title: 'Senior Frontend Developer',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2012-09',
    to: '2014-03',
    programmingLanguages: ['JavaScript'],
    software: ['BEM', 'Node.js']
  },
  {
    type: 'work',
    title: 'Frontend Team Lead',
    text: 'Yandex.Maps',
    link: 'https://yandex.com/maps',
    from: '2014-03',
    to: '2015-03',
    programmingLanguages: ['JavaScript'],
    software: ['BEM', 'Node.js']
  },
  {
    type: 'work',
    title: 'Senior JavaScript Developer',
    text: 'Matterway',
    link: 'https://matterway.io/',
    from: '2015-04',
    to: '2015-10',
    programmingLanguages: ['JavaScript'],
    software: ['Node.js', 'React', 'Redux']
  },
  {
    type: 'work',
    title: 'Engineering Team Lead',
    text: 'Matterway',
    link: 'https://matterway.io/',
    from: '2015-10',
    to: '2019-05',
    programmingLanguages: ['JavaScript', 'TypeScript'],
    software: ['Node.js', 'React', 'Redux']
  },
  {
    type: 'work',
    title: 'Engineering Team Lead',
    text: 'Zalando Lounge',
    link: 'https://www.zalando-lounge.com/',
    from: '2019-07',
    to: now,
    programmingLanguages: ['JavaScript', 'TypeScript'],
    software: ['Node.js', 'React', 'Redux']
  },
  {
    type: 'education',
    title: 'Graduated school',
    from: '1993-09',
    to: '2004-06'
  },
  {
    type: 'education',
    title: 'Graduated from University',
    text: 'Plekhanov Russian University of Economics',
    link: 'https://www.rea.ru/en/Pages/default.aspx',
    from: '2004-09',
    to: '2009-06',
    programmingLanguages: [
      'C', 'HTML', 'CSS', 'JS', 'VB'
    ]
  },
  {
    type: 'education',
    title: 'German courses',
    text: 'A2 → B2 level',
    link: 'https://www.das-akademie.de/en/',
    from: '2016-06',
    to: '2017-06'
  },
  {
    type: 'education',
    title: 'English courses',
    text: 'Beginner → Advanced level',
    from: '2000-07',
    to: '2004-05'
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
    to: '2019-10'
  },
  {
    type: 'openSource',
    title: 'ENB',
    text: 'BEM-based project bundler (like Webpack)',
    link: 'https://en.bem.info/toolbox/enb/',
    from: '2013-03',
    to: '2015-01'
  },
  {
    type: 'openSource',
    title: 'JSCS',
    text: 'JavaScript CodeStyle checker',
    link: 'https://jscs-dev.github.io/',
    from: '2013-01',
    to: '2016-04'
  },
  {
    type: 'openSource',
    title: 'html-entities',
    text: 'HTML Entities encoder / decoder',
    link: 'https://www.npmjs.com/package/html-entities',
    importance: 2,
    from: '2013-02',
    to: '2019-08'
  },
  {
    type: 'openSource',
    title: 'css-selector-parser',
    text: 'CSS Selector parser',
    link: 'https://www.npmjs.com/package/css-selector-parser',
    importance: 2,
    from: '2013-02',
    to: '2016-11'
  },
  {
    type: 'openSource',
    title: 'CST',
    text: 'JavaScript concrete syntax tree parser',
    link: 'https://www.npmjs.com/package/cst',
    importance: 2,
    from: '2015-06',
    to: '2016-04'
  },
  {
    type: 'public',
    title: 'Developing component libraries',
    text: 'Yandex Conference',
    video: 'https://video.yandex.ru/users/ya-events/view/1788/',
    language: 'RUS',
    to: '2013-10'
  },
  {
    type: 'public',
    title: 'ENB: BEM project assembler',
    text: 'BEMup',
    video: 'https://events.yandex.ru/events/bemup/2-october-2013/?openTalkVideo=297-3',
    language: 'RUS',
    to: '2013-10'
  },
  {
    type: 'public',
    title: 'JSCS: Developing OpenSource architecture',
    text: 'Talk in Rostov-on-Don, JS Meetup',
    link: 'https://www.facebook.com/events/562939683813604/',
    video: 'https://www.youtube.com/watch?v=VpKIiwYR-n0',
    language: 'RUS',
    to: '2014-03'
  },
  {
    type: 'public',
    title: 'BEViS & BT',
    text: 'Talk on CodeFest with Vadim Makishvili',
    link: 'https://2014.codefest.ru/lecture/790',
    video: 'https://www.youtube.com/watch?v=4qh6ko8jNKc',
    language: 'RUS',
    to: '2014-03'
  },
  {
    type: 'public',
    title: 'BEViS & BT',
    text: 'Talk on RIT++ with Vadim Makishvili',
    link: 'https://www.kp.ru/daily/26216.5/3100206/',
    language: 'RUS',
    to: '2014-04'
  },
  {
    type: 'public',
    title: 'Podcast interview: JSCS, BEViS, Leadership',
    text: 'Radio JS, #25',
    link: 'https://radiojs.ru/2015/06/radiojs-25/',
    audio: 'https://www.youtube.com/watch?v=VpKIiwYR-n0',
    language: 'RUS',
    to: '2015-06'
  },
  {
    type: 'public',
    title: 'JSCS: JavaScript Code Style checker',
    text: 'Fullstack.JS Berlin',
    link: 'https://www.meetup.com/fullstack-berlin/events/226856447/',
    photo: 'https://twitter.com/oelry/status/672502993846169601',
    to: '2015-12'
  }
] as TimelineItemSource[]).map((item: TimelineItemSource, index: number) => ({...item, id: `${index}`}));

export function compareDateDesc(a: string, b: string): 1 | -1 | 0 {
  return a > b ? -1 : b > a ? 1 : 0;
}
